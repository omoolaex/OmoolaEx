'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';

/**
 * Two-column Booking Component
 * - Left: live summary (sticky on desktop, collapsible on mobile)
 * - Right: interactive area (calendar -> times -> form -> success)
 */

export default function TwoColumnBooking() {
  const [slots, setSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSummaryMobile, setShowSummaryMobile] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    consultationType: '',
    message: '',
    consentNDPR: false,
    consentNewsletter: false,
  });

  const [notice, setNotice] = useState({ type: '', text: '' });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/available-slots');
        const data = await res.json();
        if (!cancelled) setSlots(data.availableSlots || []);
      } catch (err) {
        console.error('Failed to load slots', err);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const availableDays = useMemo(() => {
    const s = new Set();
    for (const slot of slots) s.add(dayjs(slot.start).format('YYYY-MM-DD'));
    return s;
  }, [slots]);

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayIndex = currentMonth.startOf('month').day();
  const prevMonthDays = currentMonth.subtract(1, 'month').daysInMonth();

  const handleDayClick = (dateStr) => {
    const daySlots = slots.filter(s => dayjs(s.start).format('YYYY-MM-DD') === dateStr);
    if (!daySlots.length) return;
    setSelectedDate(dateStr);
    setTimeSlots(daySlots);
    setSelectedSlot(daySlots[0]);
    setStep(2);
    setShowSummaryMobile(true);
  };

  const handleSelectTime = (slot) => setSelectedSlot(slot);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setNotice({ type: 'error', text: 'Please select a time slot.' });
      return;
    }
    if (!formData.consentNDPR) {
      setNotice({ type: 'error', text: 'You must agree to the NDPR terms.' });
      return;
    }

    setLoading(true);
    setNotice({ type: '', text: '' });

    try {
      const res = await fetch('/api/book-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slotStart: selectedSlot.start,
          slotEnd: selectedSlot.end,
        }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setNotice({ type: 'success', text: 'Booking confirmed — well done!' });
        setStep(3);
      } else {
        setNotice({ type: 'error', text: (data.error || 'Failed to create booking') });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setNotice({ type: 'error', text: 'Network error while booking.' });
    }
  };

  const renderCalendarGrid = () => {
    const blanks = Array.from({ length: firstDayIndex }).map((_, i) => (
      <div key={`prev-${i}`} className="text-center text-sm text-gray-300 select-none" aria-hidden>
        {prevMonthDays - firstDayIndex + i + 1}
      </div>
    ));

    const days = Array.from({ length: daysInMonth }).map((_, i) => {
      const dayNum = i + 1;
      const dateStr = currentMonth.date(dayNum).format('YYYY-MM-DD');
      const isAvailable = availableDays.has(dateStr);
      const isSelected = selectedDate === dateStr;

      return (
        <button
          key={`day-${dayNum}`}
          onClick={() => handleDayClick(dateStr)}
          disabled={!isAvailable}
          aria-disabled={!isAvailable}
          aria-pressed={isSelected}
          className={[
            'p-3 rounded-lg text-center text-sm transition-colors focus:outline-none cursor-pointer disabled:cursor-not-allowed',
            isAvailable ? (isSelected ? 'bg-[#0D4C92] text-white' : 'bg-[#38BDF8]/20 text-[#0D4C92] hover:bg-[#38BDF8]/30') : 'text-gray-400',
          ].join(' ')}
        >
          {dayNum}
        </button>
      );
    });

    const padCount = 42 - blanks.length - days.length;
    const nextPads = Array.from({ length: padCount }).map((_, i) => (
      <div key={`next-${i}`} className="text-center text-sm text-gray-300 select-none" aria-hidden>{i + 1}</div>
    ));

    return (
      <div className="grid grid-cols-7 gap-2" role="grid" aria-label="Month calendar">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-xs font-semibold text-[#0D4C92] text-center">{d}</div>
        ))}
        {blanks}{days}{nextPads}
      </div>
    );
  };

  const SummaryPanel = () => {
    const humanDate = selectedDate ? dayjs(selectedDate).format('dddd, MMM D, YYYY') : 'No date selected';
    const humanTime = selectedSlot ? dayjs(selectedSlot.start).format('HH:mm') + ' - ' + dayjs(selectedSlot.end).format('HH:mm') : 'No time selected';

    return (
      <aside className="w-full">
        <h2 className="text-base font-semibold text-gray-600" id="summary-heading">Your booking</h2>
        <div className="mt-3 p-4 rounded-xl bg-white/80 shadow-sm">
          <div className="text-xs text-gray-500">Step</div>
          <div className="mt-1 text-sm font-medium text-[#0D4C92]">
            {step === 1 ? 'Choose date' : step === 2 ? 'Choose time & details' : 'Confirmed'}
          </div>

          <hr className="my-3" />

          <div>
            <h3 className="text-xs text-gray-500">Selected date</h3>
            <div className="mt-1 text-sm">{humanDate}</div>
          </div>

          <div className="mt-3">
            <h3 className="text-xs text-gray-500">Selected time</h3>
            <div className="mt-1 text-sm">{humanTime}</div>
          </div>

          <div className="mt-3">
            <h3 className="text-xs text-gray-500">Your details</h3>
            {formData.name || formData.email || formData.phone || formData.company || formData.website ? (
              <div className="mt-1 text-sm space-y-1">
                {formData.name && <div><span className="text-gray-500">Name:</span> {formData.name}</div>}
                {formData.email && <div><span className="text-gray-500">Email:</span> {formData.email}</div>}
                {formData.phone && <div><span className="text-gray-500">Phone:</span> {formData.phone}</div>}
                {formData.company && <div><span className="text-gray-500">Company:</span> {formData.company}</div>}
                {formData.website && <div><span className="text-gray-500">Website:</span> {formData.website}</div>}
                {formData.industry && <div><span className="text-gray-500">Industry:</span> {formData.industry}</div>}
                {formData.consultationType && <div><span className="text-gray-500">Consultation:</span> {formData.consultationType}</div>}
              </div>
            ) : (
              <div className="mt-1 text-sm text-gray-400">No details yet</div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-xs text-gray-500">Summary</h3>
            <div className="mt-2 text-sm text-gray-700">
              {step === 3 ? (
                <div>Booking confirmed. Thank you!</div>
              ) : (
                <div>
                  <div>- Date: {selectedDate ? humanDate : '—'}</div>
                  <div>- Time: {selectedSlot ? humanTime : '—'}</div>
                </div>
              )}
            </div>
          </div>

          {notice.text && (
            <div className={`mt-3 p-2 rounded text-sm ${notice.type === 'success' ? 'bg-[#22C55E]/10 text-[#0D4C92]' : 'bg-red-100 text-red-700'}`}>
              {notice.text}
            </div>
          )}
        </div>
      </aside>
    );
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0D4C92] mb-2">Book a Free IT Consultation</h1>
      <p className="text-gray-600 mb-6">Get tailored advice on IT strategy, cloud solutions, digital transformation, or technology challenges affecting your business.</p>

      <div className="mb-4 md:hidden">
        <button
          onClick={() => setShowSummaryMobile(s => !s)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0D4C92] text-white cursor-pointer"
          aria-expanded={showSummaryMobile}
          aria-controls="booking-summary-mobile"
        >
          {showSummaryMobile ? 'Hide summary' : 'Show summary'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`md:w-1/3 md:sticky md:top-24 ${showSummaryMobile ? 'block' : 'hidden md:block'}`} id="booking-summary-mobile" aria-hidden={!showSummaryMobile && true}>
          <SummaryPanel />
        </div>

        <div className="hidden md:block w-px bg-gray-200 mx-2" aria-hidden />

        <section className="flex-1 md:max-w-[60%] lg:max-w-[65%]">
          <div className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="calendar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-semibold text-[#0D4C92]">Choose a date</h2>
                  <p className="text-sm text-gray-600 mt-1">Select a day highlighted in blue (you can book up to 2 months ahead).</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="px-3 py-1 rounded border text-[#0D4C92] cursor-pointer" onClick={() => setCurrentMonth(cm => cm.subtract(1, 'month'))} aria-label="Previous month">← Prev</button>
                    <div className="text-sm font-semibold">{currentMonth.format('MMMM YYYY')}</div>
                    <button className="px-3 py-1 rounded border text-[#0D4C92] cursor-pointer" onClick={() => setCurrentMonth(cm => cm.add(1, 'month'))} aria-label="Next month">Next →</button>
                  </div>
                  <div className="mt-4">{renderCalendarGrid()}</div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="times" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-semibold text-[#0D4C92]">Choose a time & Enter Details</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Available times for {selectedDate ? dayjs(selectedDate).format('dddd, MMM D') : ''}
                  </p>

                  {/* Horizontally scrollable time slots */}
                  <div className="mt-4 overflow-x-auto">
                    <div className="flex gap-3 min-w-max">
                      {timeSlots.map((slot, idx) => {
                        const isSelected = selectedSlot && selectedSlot.start === slot.start;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectTime(slot)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 focus:outline-none cursor-pointer ${
                              isSelected
                                ? 'bg-[#0D4C92] text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            aria-pressed={isSelected}
                          >
                            {dayjs(slot.start).format('HH:mm')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                {/* Form Fields */}
                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {['name','email','phone','company','website'].map(f => (
                      <div key={f}>
                        <label className="block text-sm text-gray-600">
                          {f.charAt(0).toUpperCase() + f.slice(1)}{['name','email','phone'].includes(f) && <span className="text-red-500"> *</span>}
                        </label>
                        <input
                          name={f}
                          value={formData[f]}
                          onChange={handleInput}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#38BDF8]"
                          required={['name','email','phone'].includes(f)}
                        />
                      </div>
                    ))}

                    {/* Industry Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-600">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInput}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#38BDF8]"
                        required
                      >
                        <option value="">Select Industry</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Retail">Retail</option>
                        <option value="Education">Education</option>
                        <option value="Technology">Technology</option>
                        <option value="Technology">Logistics</option>
                        <option value="Technology">Technology</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Events">Events</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Consultation Type Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-600">
                        Consultation Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="consultationType"
                        value={formData.consultationType}
                        onChange={handleInput}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#38BDF8]"
                        required
                      >
                        <option value="">Select Consultation Type</option>
                        <option value="IT Strategy & Advisory">IT Strategy & Advisory</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Website / Software Development">Website / Software Development</option>
                        <option value="Cloud Migration & Infrastructure">Cloud Migration & Infrastructure</option>
                        <option value="Managed IT Services">Managed IT Services</option>
                        <option value="Brand & Digital Growth">Brand & Digital Growth</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600">Consultation Note / Context</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInput}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#38BDF8]"
                        rows={3}
                      ></textarea>
                    </div>

                    <div className="flex flex-col">
                      <label className="inline-flex items-center mt-2">
                        <input type="checkbox" name="consentNDPR" checked={formData.consentNDPR} onChange={handleInput} required className="mr-2"/>
                        I agree to the NDPR-compliant privacy terms. <span className="text-red-500">*</span>
                      </label>
                      <label className="inline-flex items-center mt-1">
                        <input type="checkbox" name="consentNewsletter" checked={formData.consentNewsletter} onChange={handleInput} className="mr-2"/>
                        Subscribe to newsletter
                      </label>
                    </div>

                    {notice.text && <div className={`text-sm p-2 rounded ${notice.type==='success'?'bg-[#22C55E]/10 text-[#0D4C92]':'bg-red-100 text-red-700'}`}>{notice.text}</div>}

                    <div className="flex items-center gap-3">
                      <button type="submit" disabled={loading} className="bg-[#0D4C92] text-white px-4 py-2 rounded-lg">
                        {loading ? 'Booking...' : 'Confirm booking'}
                      </button>
                      <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-600 underline">
                        ← Change date
                      </button>
                    </div>
                  </form>
                </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="text-center py-8">
                    <div className="text-7xl text-[#22C55E]">✓</div>
                    <h2 className="text-2xl font-semibold text-[#0D4C92] mt-4">Booking confirmed</h2>
                    <p className="mt-2 text-gray-600">Thanks — we&apos;ve scheduled your consultation. A confirmation was emailed.</p>
                    <div className="mt-6">
                      <button onClick={() => {
                        setStep(1);
                        setFormData({ name:'',email:'',phone:'',company:'',website:'',industry:'',consultationType:'',message:'',consentNDPR:false,consentNewsletter:false });
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setNotice({type:'', text:''});
                      }} className="px-4 py-2 rounded bg-gray-100">Book another slot</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
