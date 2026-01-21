"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaTimes, FaCommentAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const actionsData = [
  {
    label: "Chat on WhatsApp",
    href: "https://wa.me/2347089217123",
    icon: <FaWhatsapp size={20} />,
    bgColor: "bg-green-500 hover:bg-green-600",
  },
  {
    label: "Call OmoolaEx",
    href: "tel:+2347089217123",
    icon: <FaPhoneAlt size={20} />,
    bgColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    label: "Send an Email",
    href: "mailto:info@omoolaex.com.ng",
    icon: <FaEnvelope size={20} />,
    bgColor: "bg-amber-500 hover:bg-amber-600",
  },
];

export default function FloatingContactActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const trackEvent = (action) => {
    if (typeof window !== "undefined") {
      window.gtag?.("event", action, { event_category: "FloatingContact" });
      window.plausible?.("FloatingContact", { props: { action } });
      console.log("Tracked:", action);
    }
  };

  // Auto-close after 6 seconds
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => setIsOpen(false), 6000);
      setTimeoutId(id);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 touch-none"
      drag
      dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
      dragElastic={0.2}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating Actions */}
      <AnimatePresence>
        {isOpen &&
          actionsData.map((action, idx) => (
            <motion.a
              key={idx}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(action.label)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.08 }}
              className={`${action.bgColor} text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transform transition relative`}
              data-tooltip-id={`tooltip-${idx}`}
              data-tooltip-content={action.label}
              aria-label={action.label}
            >
              {action.icon}
              <Tooltip
                id={`tooltip-${idx}`}
                place="left"
                effect="solid"
                className="bg-gray-800 text-white text-xs font-medium rounded-md py-1 px-2"
              />
            </motion.a>
          ))}
      </AnimatePresence>

      {/* Main Toggle */}
      <motion.button
        onClick={toggleMenu}
        className={`p-4 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          isOpen ? "bg-gray-800" : "bg-blue-700"
        }`}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? <FaTimes size={22} /> : <FaCommentAlt size={22} />}
      </motion.button>
    </motion.div>
  );
}
