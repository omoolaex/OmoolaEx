// components/CookieConsent.js
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("omx_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem("omx_cookie_consent", accepted ? "accepted" : "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
    >
      <p className="text-gray-700">
        We use cookies to improve your browsing experience and analyze site traffic.{" "}
        <a href="/cookie-policy" className="text-blue-600 underline">Learn more</a>.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handleConsent(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 transition"
        >
          Decline
        </button>
      </div>
    </motion.div>
  );
}