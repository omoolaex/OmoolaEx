"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What does OmoolaEx do?",
    answer:
      "OmoolaEx is a professional IT Consulting and Digital Solutions company helping businesses grow through innovative web, brand, and tech services.",
  },
  {
    question: "Who are your services for?",
    answer:
      "We work with small to mid-sized businesses, startups, entrepreneurs, and organizations seeking quality digital transformation.",
  },
  {
    question: "What web technologies do you specialize in?",
    answer:
      "We specialize in WordPress, React/Next.js, and modern tech stacks tailored to project needs.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing varies based on scope. We offer flexible packages and custom quotes after a discovery call.",
  },
  {
    question: "Can I request a custom solution?",
    answer:
      "Absolutely. All our services are tailored to your business needs — from simple landing pages to complex IT systems.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary. Simple websites may take 1–2 weeks, while full-stack projects may take 3–8 weeks.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes. We offer structured revision rounds as part of each project package.",
  },
  {
    question: "Will you maintain my website after launch?",
    answer:
      "Yes, we offer optional maintenance and support plans after launch.",
  },
  {
    question: "How do I communicate with the team?",
    answer:
      "We use email, WhatsApp, and scheduled calls to stay connected throughout your project.",
  },
  {
    question: "Can you train my team on how to use the solutions you build?",
    answer:
      "Yes. We offer training and documentation to ensure you or your staff can manage your solution confidently.",
  },
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium hover:bg-gray-50 transition-all"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-6 pb-4 text-gray-600"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}