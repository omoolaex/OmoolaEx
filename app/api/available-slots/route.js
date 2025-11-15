import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";

const CACHE_FILE = path.resolve("./availabilityCache.json");
const REFRESH_INTERVAL = 1000 * 60 * 15; // 15 min
const PRUNE_DAYS = 14;

let cache = { slots: [], lastUpdated: 0 };
let isRefreshing = false;

// ----- OAuth helper -----
function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

// ----- Split free period into 30-min slots -----
function splitIntoSlots(freeStart, freeEnd) {
  const slots = [];
  let start = new Date(freeStart);

  while (start < freeEnd) {
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    if (end > freeEnd) break;

    slots.push({
      start: start.toISOString(),
      end: end.toISOString(),
    });
    start = end;
  }

  return slots;
}

// ----- HH:MM -> Date -----
function toDate(day, timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
}

// ----- Prune slots to next N days -----
function pruneSlots(slots, days = PRUNE_DAYS) {
  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + days);
  return slots.filter((s) => new Date(s.start) >= now && new Date(s.start) <= maxDate);
}

// ----- Load cache from disk -----
async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (parsed.slots && parsed.lastUpdated) cache = parsed;
    console.log("[Availability] Cache loaded:", cache.slots.length, "slots");
  } catch {
    console.log("[Availability] No cache file found, starting fresh");
  }
}

// ----- Save cache to disk -----
async function saveCache() {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  } catch (err) {
    console.error("[Availability] Error saving cache:", err);
  }
}

// ----- Refresh availability -----
async function refreshAvailability() {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });
    const calendars = [process.env.PRIMARY_CALENDAR_ID, process.env.SECONDARY_CALENDAR_ID];

    const now = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 60);

    const response = await calendar.freebusy.query({
      resource: {
        timeMin: now.toISOString(),
        timeMax: end.toISOString(),
        timeZone: "Africa/Lagos",
        items: calendars.map((id) => ({ id })),
      },
    });

    // Merge busy slots
    const busy = [];
    calendars.forEach((cal) => {
      busy.push(...(response.data.calendars[cal].busy || []));
    });

    const workingHours = [
      {
        daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        startTime: "09:00",
        endTime: "17:00",
      },
    ];

    const nameMap = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

    const availableSlots = [];

    for (let day = new Date(now); day < end; day.setDate(day.getDate() + 1)) {
      const dayName = nameMap[day.getDay()];
      const wh = workingHours.filter((x) => x.daysOfWeek.includes(dayName));
      if (!wh.length) continue;

      wh.forEach((range) => {
        const workStart = toDate(day, range.startTime);
        const workEnd = toDate(day, range.endTime);
        const safeStart = workStart < now ? now : workStart;

        let free = [{ start: safeStart, end: workEnd }];

        const dayBusy = busy.filter((b) => {
          const s = new Date(b.start), e = new Date(b.end);
          return e > safeStart && s < workEnd;
        });

        dayBusy.forEach((b) => {
          const bs = new Date(b.start), be = new Date(b.end);
          const updated = [];
          free.forEach((p) => {
            if (be <= p.start || bs >= p.end) updated.push(p);
            else {
              if (bs > p.start) updated.push({ start: p.start, end: bs });
              if (be < p.end) updated.push({ start: be, end: p.end });
            }
          });
          free = updated;
        });

        free.forEach((p) => availableSlots.push(...splitIntoSlots(p.start, p.end)));
      });
    }

    cache.slots = pruneSlots(availableSlots);
    cache.lastUpdated = Date.now();
    await saveCache();
    console.log("[Availability] Refreshed", cache.slots.length, "slots");
  } catch (err) {
    console.error("[Availability] Refresh error →", err);
  } finally {
    isRefreshing = false;
  }
}

// ----- Pre-warm cache -----
await loadCache();
if (!cache.lastUpdated || Date.now() - cache.lastUpdated > REFRESH_INTERVAL) {
  await refreshAvailability();
}

// ----- Background refresh -----
setInterval(refreshAvailability, REFRESH_INTERVAL);

// ----- API GET -----
export async function GET() {
  return new Response(JSON.stringify({ availableSlots: cache.slots }), { status: 200 });
}
