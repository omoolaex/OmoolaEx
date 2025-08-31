"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingAndBenefits() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: "Starter Website",
      price: "₦150,000",
      tagline: "Perfect for small businesses & personal brands",
      features: [
        "5-7 custom responsive pages",
        "Basic SEO setup for visibility",
        "Mobile-first, fast-loading design",
        "Contact form & social media integration",
        "1-month free support & maintenance",
      ],
    },
    {
      name: "Professional Website",
      price: "₦300,000",
      tagline: "Ideal for growing businesses & startups",
      features: [
        "Up to 12 pages with tailored UI/UX design",
        "SEO-friendly structure + on-page optimization",
        "Blog / News section for content marketing",
        "Performance & security optimization",
        "2-month priority support & updates",
      ],
      highlight: true,
    },
    {
      name: "Enterprise Website",
      price: "₦500,000+",
      tagline: "Advanced solutions for scaling organizations",
      features: [
        "Unlimited pages & advanced functionality",
        "Full e-commerce integration with payment gateways",
        "Advanced SEO & Google Analytics setup",
        "Custom API & third-party integrations",
        "Ongoing support, training & dedicated account manager",
      ],
    },
  ];

  const openForm = (plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setSelectedPlan(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      websiteType: formData.get("websiteType"),
      timeline: formData.get("timeline"),
      goals: formData.get("goals"),
      package: selectedPlan?.name,
      packagePrice: selectedPlan?.price,
      packageFeatures: selectedPlan?.features || [],
    };

    try {
      const res = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ Request submitted successfully!");
        closeForm();
      } else {
        alert("❌ Error: " + (result.error || "Failed to submit"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Website Packages Built for Growth
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            At <span className="font-semibold text-blue-600">Omoolaex</span>, we
            design websites that don’t just look great—they work for your business.
            Choose the plan that matches your goals and let us bring your vision to life.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`relative flex flex-col p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all
                bg-gradient-to-b ${
                  plan.highlight
                    ? "from-blue-50 to-white border-2 border-blue-600"
                    : "from-white to-gray-50 border border-gray-200"
                }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {plan.highlight && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}

              <div className="flex-1">
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-1 ${
                    plan.highlight ? "text-blue-700" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{plan.tagline}</p>
                <p
                  className={`text-2xl sm:text-3xl font-extrabold mb-5 ${
                    plan.highlight ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {plan.price}
                </p>

                <ul className="text-gray-700 space-y-2 text-sm sm:text-base mb-5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openForm(plan)}
                className={`mt-auto px-6 py-3 rounded-lg font-medium transition
                  ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                {plan.highlight ? "Get Started Today" : "Request This Package"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto flex flex-col relative"
            >
              <button
                onClick={closeForm}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>

              <div className="p-6 sm:p-8 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                  Start Your {selectedPlan?.name} Project
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-5">
                  Fill in your project details below so{" "}
                  <span className="font-semibold text-blue-600">Omoolaex</span> can get started.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="selectedPlan" value={selectedPlan?.name} />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                    required
                  />
                  <select
                    name="websiteType"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
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
                    name="timeline"
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                  >
                    <option value="">What’s your expected timeline?</option>
                    <option value="1month">1 month or less</option>
                    <option value="2-3months">2–3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  <textarea
                    name="goals"
                    placeholder="Tell us about your project goals..."
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-base"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-medium text-base transition ${
                      loading
                        ? "bg-blue-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Submitting..." : "Submit Project Request"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
