'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal';

export default function MultiStepBookingForm({ serviceType }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const WORKING_HOURS = { start: 9, end: 17 };
  const SLOT_INTERVAL = 30;
  const DISABLE_WEEKENDS = false; // true to disable Sat/Sun

  // Fetch booked slots from backend
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const res = await fetch('/api/bookings/fetchGoogleEvents');
        const data = await res.json();
        setBookedSlots(data);
      } catch (err) {
        console.error('Failed to fetch booked slots', err);
      }
    };
    fetchBookedSlots();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateTimeSlots = (date) => {
    if (!date) return [];
    const formattedDate = date.toISOString().split('T')[0];
    const now = new Date();
    const slots = [];

    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
      for (let min = 0; min < 60; min += SLOT_INTERVAL) {
        const t = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const isBooked = bookedSlots.some((b) => b.date === formattedDate && b.time === t);

        // Disable past times for today
        let disabled = isBooked;
        if (formattedDate === now.toISOString().split('T')[0]) {
          const slotDateTime = new Date(date);
          slotDateTime.setHours(hour, min, 0, 0);
          if (slotDateTime <= now) disabled = true;
        }

        slots.push({ time: t, disabled });
      }
    }
    return slots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/bookings/handleBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          ...formData,
        }),
      });

      setSuccessModal(true);
      setStep(1);
      setSelectedDate(null);
      setSelectedTime('');
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });

      // Refresh booked slots dynamically
      const res = await fetch('/api/bookings/fetchGoogleEvents');
      const data = await res.json();
      setBookedSlots(data);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    }

    setLoading(false);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Disable past dates
      if (date < today) return true;

      // Optional: disable weekends
      if (DISABLE_WEEKENDS && (date.getDay() === 0 || date.getDay() === 6)) return true;
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const isBooked = bookedSlots.some((b) => b.date === formattedDate);
      return isBooked ? 'bg-red-100 text-red-800 rounded-md' : '';
    }
    return '';
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 bg-gray-50 p-5 sm:p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{serviceType} Booking</h2>
          <p className="text-gray-700 mb-4">
            Schedule your consultation easily. Select a date & time, fill in your details, and submit.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">✔ Choose your preferred date & time</li>
            <li className="flex items-center gap-2">✔ Enter your contact details</li>
            <li className="flex items-center gap-2">✔ Receive confirmation via email</li>
          </ul>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 bg-white p-5 sm:p-6 rounded-xl shadow-lg"
        >
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Step 1: Select Date & Time</h3>
              <Calendar
                minDate={new Date()}
                value={selectedDate}
                onChange={setSelectedDate}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                className="react-calendar border rounded-lg"
              />

              {selectedDate && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-52 overflow-y-auto">
                  {generateTimeSlots(selectedDate).map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.disabled}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-2 sm:px-3 rounded-md text-sm sm:text-base font-medium transition
                        ${slot.disabled
                          ? 'bg-gray-300 cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 hover:bg-blue-200'}`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold mb-3">Step 2: Your Details</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Additional Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3 sm:gap-0">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition w-full sm:w-auto"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-600 px-6 py-2 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <Modal onClose={() => setSuccessModal(false)}>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="mb-4">
              Your consultation for <strong>{serviceType}</strong> has been booked successfully.
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-blue-600 px-6 py-2 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
