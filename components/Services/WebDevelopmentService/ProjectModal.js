"use client";

export default function ProjectModal({ isOpen, plan, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">
          Start Your {plan?.name} Project
        </h3>
        <p className="text-gray-600 mb-6">
          Fill in your project details below so{" "}
          <span className="font-semibold text-blue-600">Omoolaex</span> can
          get started with bringing your vision to life.
        </p>
        <form className="space-y-4">
          <input type="hidden" value={plan?.name} name="selectedPlan" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Work Email"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <select
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">What type of website do you need?</option>
            <option value="business">Business / Corporate</option>
            <option value="ecommerce">E-commerce Store</option>
            <option value="portfolio">Portfolio / Personal Brand</option>
            <option value="blog">Blog / Content Website</option>
            <option value="other">Other</option>
          </select>
          <select
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">What’s your expected timeline?</option>
            <option value="1month">1 month or less</option>
            <option value="2-3months">2–3 months</option>
            <option value="flexible">Flexible</option>
          </select>
          <textarea
            placeholder="Tell us about your project goals..."
            rows={4}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Submit Project Request
          </button>
        </form>
      </div>
    </div>
  );
}
