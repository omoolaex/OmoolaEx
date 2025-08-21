'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqStructuredData } from './FaqStructuredData';

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-4">
        {faqStructuredData.map((faq, index) => (
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
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
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
