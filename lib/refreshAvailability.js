import { google } from "googleapis";
import { updateCachedAvailability } from "./availabilityCache";

function getOAuth() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

function splitSlots(start, end) {
  const slots = [];
  let t = new Date(start);
  while (t < end) {
    const next = new Date(t.getTime() + 30 * 60 * 1000);
    if (next > end) break;
    slots.push({ start: t.toISOString(), end: next.toISOString() });
    t = next;
  }
  return slots;
}

function toDate(base, time) {
  const [h, m] = time.split(":").map(Number);
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m);
}

export async function refreshAvailability() {
  try {
    const auth = getOAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const calendars = [
      process.env.PRIMARY_CALENDAR_ID,
      process.env.SECONDARY_CALENDAR_ID,
    ];

    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() + 60);

    const res = await calendar.freebusy.query({
      resource: {
        timeMin: now.toISOString(),
        timeMax: end.toISOString(),
        items: calendars.map((id) => ({ id })),
      },
    });

    const busy = calendars.flatMap((c) => res.data.calendars[c]?.busy || []);

    const workingHours = {
      start: "09:00",
      end: "17:00",
      days: [1, 2, 3, 4, 5], // Mon-Fri
    };

    const slots = [];

    for (let d = new Date(now); d < end; d.setDate(d.getDate() + 1)) {
      if (!workingHours.days.includes(d.getDay())) continue;

      const ws = toDate(d, workingHours.start);
      const we = toDate(d, workingHours.end);

      const dayBusy = busy.filter((b) => {
        const s = new Date(b.start);
        const e = new Date(b.end);
        return e > ws && s < we;
      });

      let free = [{ start: ws, end: we }];

      dayBusy.forEach((b) => {
        const bs = new Date(b.start);
        const be = new Date(b.end);
        const updated = [];

        free.forEach((f) => {
          if (be <= f.start || bs >= f.end) {
            updated.push(f);
          } else {
            if (bs > f.start) updated.push({ start: f.start, end: bs });
            if (be < f.end) updated.push({ start: be, end: f.end });
          }
        });

        free = updated;
      });

      free.forEach((f) => slots.push(...splitSlots(f.start, f.end)));
    }

    updateCachedAvailability(slots);
    console.log("Availability refreshed:", slots.length);

  } catch (err) {
    console.error("REFRESH ERROR →", err);
  }
}
