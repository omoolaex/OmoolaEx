'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CalendarDisplay({ onSelectSlot }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch booked slots from SheetDB
    fetch(process.env.NEXT_PUBLIC_SHEETDB_URL)
      .then(res => res.json())
      .then(data => {
        const bookedEvents = data.map(booking => ({
          title: 'Booked',
          start: `${booking.date}T${booking.time}`,
          allDay: false,
          backgroundColor: '#f87171'
        }));
        setEvents(bookedEvents);
      });
  }, []);

  const handleDateClick = (info) => {
    // Auto-fill form date
    if (onSelectSlot) onSelectSlot(info.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      dateClick={handleDateClick}
      height="auto"
    />
  );
}
