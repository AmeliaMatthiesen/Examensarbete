import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

// Säkerställ att alla miljövariabler finns
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error('❌ Google OAuth env variables missing. Check .env file!');
}

// Initiera OAuth2-klienten
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// 🔐 Steg 1: Skapa auth-URL för Google Login
export const getAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent select_account',
    redirect_uri: GOOGLE_REDIRECT_URI
  });

  console.log('🔗 Generated Google Auth URL:', url); // Debug-logg
  return url;
};

// 🔁 Steg 2: Byt auth-code mot access/refresh tokens
export const getTokens = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error('❌ Failed to exchange auth code for tokens:', error.message);
    throw new Error('Google OAuth token exchange failed');
  }
};

// 🛠️ Hjälpfunktion: sätt tokens på klienten
export const setCredentials = (tokens) => {
  if (!tokens || !tokens.access_token) {
    throw new Error('Invalid tokens – cannot set credentials');
  }
  oauth2Client.setCredentials(tokens);
};

// 📆 Steg 3: Skapa Google Calendar-händelse
export const createCalendarEvent = async (tokens, task) => {
  try {
    setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startTime = new Date(task.dueDate);
    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000); // +15 min

    const event = {
      summary: task.title,
      description: task.description,
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() }
    };

    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    return data.id;
  } catch (error) {
    console.error('❌ Failed to create calendar event:', error.message);
    throw new Error('Google Calendar sync failed (create)');
  }
};

// 📝 Uppdatera befintlig kalenderhändelse
export const updateCalendarEvent = async (tokens, eventId, task) => {
  try {
    setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startTime = new Date(task.dueDate);
    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);

    const event = {
      summary: task.title,
      description: task.description,
      start: { dateTime: startTime.toISOString() },
      end: { dateTime: endTime.toISOString() }
    };

    await calendar.events.update({
      calendarId: 'primary',
      eventId,
      resource: event
    });
  } catch (error) {
    console.error('❌ Failed to update calendar event:', error.message);
    throw new Error('Google Calendar sync failed (update)');
  }
};

// 🗑️ Radera kalenderhändelse
export const deleteCalendarEvent = async (tokens, eventId) => {
  try {
    setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId
    });
  } catch (error) {
    console.error('❌ Failed to delete calendar event:', error.message);
    throw new Error('Google Calendar sync failed (delete)');
  }
};
