import {
    Calendar,
    dateFnsLocalizer,
    Views,
  } from "react-big-calendar";
  import "react-big-calendar/lib/css/react-big-calendar.css";
  
  import { format, parse, startOfWeek, getDay } from "date-fns";
  import { enGB } from "date-fns/locale";
  import { useEffect, useState } from "react";
  import { gapi } from "gapi-script";
  
  const locales = { "en-GB": enGB };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: enGB }),
    getDay,
    locales,
  });
  
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY!;
  
  type ColoredEvent = {
    title: string;
    start: Date;
    end: Date;
    color: string;
  };
  
  const CalendarView = () => {
    const [events, setEvents] = useState<ColoredEvent[]>([]);
    const [calendars, setCalendars] = useState<any[]>([]);
    const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
    const [calendarColors, setCalendarColors] = useState<Map<string, string>>(new Map());
  
    useEffect(() => {
      const initClient = async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: SCOPES,
        });
  
        const auth = gapi.auth2.getAuthInstance();
        if (!auth.isSignedIn.get()) await auth.signIn();
  
        const res = await gapi.client.calendar.calendarList.list();
        const cals = res.result.items || [];
  
        setCalendars(cals);
        const defaultIds = cals.map((c) => c.id);
        setSelectedCalendars(defaultIds);
  
        const colorMap = new Map<string, string>();
        cals.forEach((cal) => {
          colorMap.set(cal.id, cal.backgroundColor || "#3b82f6");
        });
        setCalendarColors(colorMap);
  
        loadEvents(defaultIds, colorMap);
      };
  
      gapi.load("client:auth2", initClient);
    }, []);
  
    const loadEvents = async (calendarIds: string[], colorMap: Map<string, string>) => {
      const allEvents: ColoredEvent[] = [];
  
      for (const id of calendarIds) {
        try {
          const res = await gapi.client.calendar.events.list({
            calendarId: id,
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 250,
            orderBy: "startTime",
          });
  
          const mapped = (res.result.items || []).map((event: any) => ({
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end?.dateTime || event.end?.date || event.start.dateTime || event.start.date),
            color: colorMap.get(id) || "#3b82f6",
          }));
  
          allEvents.push(...mapped);
        } catch (err) {
          console.warn("❌ Failed to fetch calendar:", id, err);
        }
      }
  
      setEvents(allEvents);
    };
  
    const toggleCalendar = (id: string) => {
      let updated = selectedCalendars.includes(id)
        ? selectedCalendars.filter((cid) => cid !== id)
        : [...selectedCalendars, id];
  
      setSelectedCalendars(updated);
      loadEvents(updated, calendarColors);
    };
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Your Calendar</h2>
  
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <aside className="w-64 flex-shrink-0">
            <p className="text-sm text-gray-500 mb-2">Filter calendars:</p>
            <ul className="space-y-1">
              {calendars.map((cal) => (
                <li key={cal.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCalendars.includes(cal.id)}
                    onChange={() => toggleCalendar(cal.id)}
                    className="accent-gray-500"
                  />
                  <span className="text-sm text-gray-700" style={{ color: calendarColors.get(cal.id) }}>
                    {cal.summary}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
  
          {/* Calendar View */}
          <section className="flex-1">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView={Views.WEEK}
              views={["week"]}
              style={{ height: 500 }}
              eventPropGetter={(event: ColoredEvent) => ({
                style: {
                  backgroundColor: event.color,
                  color: "white",
                  borderRadius: "6px",
                  border: "none",
                },
              })}
            />
          </section>
        </div>
      </div>
    );
  };
  
  export default CalendarView;
  