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
  
  const locales = {
    "en-GB": enGB,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { locale: enGB }),
    getDay,
    locales,
  });
  
  const CalendarView = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 100,
          orderBy: "startTime",
        })
        .then((res: any) => {
          const data = res.result.items?.map((event: any) => ({
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end?.dateTime || event.end?.date || event.start.dateTime || event.start.date),
          }));
          setEvents(data || []);
        });
    }, []);
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["week"]}
          defaultView="week"
        />
      </div>
    );
  };
  
  export default CalendarView;
  