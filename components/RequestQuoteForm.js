"use client";

import { useState } from "react";

export default function RequestQuoteForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    budget: "",
    timeline: "",
    message: "",
    contactMethod: "Email",
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
    console.log(form); // Later: hook into API or email handler

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-4">
        {["Full Name", "Email Address"].map((label, i) => {
          const name = i === 0 ? "name" : "email";
          const type = i === 0 ? "text" : "email";
          return (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                type={type}
                required
                value={form[name]}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          );
        })}
      </div>

      {/* Phone & Company */}
      <div className="grid md:grid-cols-2 gap-4">
        {["phone", "company"].map((name) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {name === "phone" ? "Phone Number" : "Company / Organization"}
            </label>
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        ))}
      </div>

      {/* Type, Budget, Timeline */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            name: "type",
            label: "Project Type",
            options: [
              "Web Design & Development",
              "Brand Identity & Design",
              "IT Consulting",
              "Digital Marketing",
              "E-Commerce Solutions",
              "Software Development",
              "IT Training",
              "Other",
            ],
          },
          {
            name: "budget",
            label: "Budget Range",
            options: [
              "Less than ₦200,000",
              "₦200,000 - ₦500,000",
              "₦500,000 - ₦1,000,000",
              "Over ₦1,000,000",
            ],
          },
          {
            name: "timeline",
            label: "Timeline",
            options: ["ASAP", "1–2 Weeks", "2–4 Weeks", "1–2 Months", "Flexible"],
          },
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
              name={name}
              required
              value={form[name]}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="">Select</option>
              {options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1">Tell Us About Your Project</label>
        <textarea
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your goals, features, target audience, etc."
          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>

      {/* File & Contact Method */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Attach File (optional)</label>
          <input
            name="file"
            type="file"
            onChange={handleChange}
            className="w-full file:border-0 file:rounded file:px-4 file:py-2 file:bg-blue-100 file:text-blue-800 file:cursor-pointer border rounded-lg py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preferred Contact Method</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {["Email", "Phone Call", "WhatsApp", "Any"].map((method) => (
              <label key={method} className="inline-flex items-center space-x-2 cursor-pointer">
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
          I consent to being contacted and agree to the{" "}
          <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-md"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}