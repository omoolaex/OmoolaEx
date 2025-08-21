"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const router = useRouter();

  // Set expiry date
  const expiryDate = new Date("2025-09-15T23:59:59");

  useEffect(() => {
    const lastDismissed = localStorage.getItem("discountPopupDismissedAt");

    if (lastDismissed) {
      const lastTime = new Date(lastDismissed);
      const now = new Date();

      if (
        lastTime.getDate() === now.getDate() &&
        lastTime.getMonth() === now.getMonth() &&
        lastTime.getFullYear() === now.getFullYear()
      ) {
        setHasShown(true);
        return;
      }
    }

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("discountPopupDismissedAt", new Date().toISOString());
      }
    }, 10000);

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("discountPopupDismissedAt", new Date().toISOString());
      }
    };

    const handleScroll = () => {
      if (
        window.scrollY >
          document.documentElement.scrollHeight / 2 - window.innerHeight &&
        !hasShown
      ) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("discountPopupDismissedAt", new Date().toISOString());
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = expiryDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("discountPopupDismissedAt", new Date().toISOString());
  };

  const handleClaim = () => {
    handleClose();
    router.push("/request-a-quote?discount=20OFF");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden flex flex-col md:flex-row relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Side Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
              <Image
                src="/images/discount-offer.png"
                alt="Discount Offer"
                width={600}
                height={600}
                className="object-contain"
                priority
              />
            </div>

            {/* Right Side Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center text-center md:text-left relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                🎉 Limited Time Offer!
              </h2>
              <p className="text-gray-600 mb-6">
                Get{" "}
                <span className="font-semibold text-indigo-600">20% OFF</span>{" "}
                on all our services. Don’t miss out—offer ends soon!
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-center md:justify-start gap-4 mb-6">
                {["Days", "Hours", "Min", "Sec"].map((label, i) => {
                  const values = [
                    timeLeft.days,
                    timeLeft.hours,
                    timeLeft.minutes,
                    timeLeft.seconds,
                  ];
                  return (
                    <div key={label} className="text-center">
                      <span className="block text-2xl font-bold text-gray-900">
                        {values[i]}
                      </span>
                      <span className="text-sm text-gray-500">{label}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleClaim}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Claim Your Discount
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
