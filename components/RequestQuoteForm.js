'use client';

import { useState } from 'react';

export default function RequestQuoteForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: '',
    budget: '',
    timeline: '',
    message: '',
    contactMethod: 'Email',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // TODO: Integrate with email or backend service
    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg space-y-8"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Request a Quote
        </h2>
        <p className="text-gray-600 mt-2">
          Kindly provide us with details about your project or service request.
        </p>
      </div>

      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="example@domain.com"
          />
        </div>
      </div>

      {/* Phone & Company */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="+234..."
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Company / Organization</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Optional"
          />
        </div>
      </div>

      {/* Project Type, Budget, Timeline */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: 'type',
            label: 'Project Type',
            options: [
              'Web Design & Development',
              'Brand Identity & Design',
              'IT Consulting',
              'Digital Marketing',
              'E-Commerce Solutions',
              'Software Development',
              'IT Training',
              'Other',
            ],
          },
          {
            name: 'budget',
            label: 'Budget Range',
            options: [
              'Less than ₦200,000',
              '₦200,000 - ₦500,000',
              '₦500,000 - ₦1,000,000',
              'Over ₦1,000,000',
            ],
          },
          {
            name: 'timeline',
            label: 'Expected Timeline',
            options: ['ASAP', '1–2 Weeks', '2–4 Weeks', '1–2 Months', 'Flexible'],
          },
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <select
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select an option</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Project Description */}
      <div>
        <label className="block mb-2 text-sm font-medium">Tell Us About Your Project</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Include goals, target audience, features, etc."
        />
      </div>

      {/* File Upload & Contact Method */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Attach File (optional)</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg file:cursor-pointer"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Preferred Contact Method</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {['Email', 'Phone Call', 'WhatsApp', 'Any'].map((method) => (
              <label key={method} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={form.contactMethod === method}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-2 text-sm text-gray-700">
        <input type="checkbox" required />
        <p>
          I agree to be contacted and accept the{' '}
          <a href="/privacy-policy" className="text-blue-600 underline hover:text-blue-800">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}