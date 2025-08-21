"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function RequestQuoteForm({ onSuccess }) {
  const searchParams = useSearchParams();
  const discountCode = searchParams.get("discount");

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
    discount: discountCode || "", // auto-fill if present
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        setStatus({ type: "error", message: "❌ Only PDF, DOC, DOCX, JPG, and PNG files are allowed." });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setStatus({ type: "error", message: "❌ File size exceeds 10MB." });
        return;
      }

      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setStatus({
          type: "success",
          message: "✅ Request submitted successfully! We’ll reach out to you shortly.",
        });

        if (onSuccess) onSuccess();

        setForm({
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
          discount: "",
        });
      } else {
        setStatus({ type: "error", message: "❌ Submission failed. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "❌ Something went wrong while submitting." });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg space-y-8"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Request a Quote</h2>
        <p className="text-gray-600 mt-2">
          Provide details about your project or service request and we’ll get back to you.
        </p>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`flex items-center justify-between p-4 rounded-lg text-sm font-medium transition-all ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {status.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span>{status.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatus(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Discount Banner */}
      {form.discount && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-300">
          🎉 You’ve claimed a{" "}
          <span className="font-bold text-green-700">{form.discount} discount</span> on this
          request.
          <input type="hidden" name="discount" value={form.discount} />
        </div>
      )}

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
            label: "Expected Timeline",
            options: ["ASAP", "1–2 Weeks", "2–4 Weeks", "1–2 Months", "Flexible"],
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
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Preferred Contact Method</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Email", "Phone Call", "WhatsApp", "Any"].map((method) => (
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
        <input type="checkbox" required className="mt-1 accent-blue-600" />
        <p>
          I agree to be contacted and accept the{" "}
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
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
