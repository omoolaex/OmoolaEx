'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DiscountPopup() {
  const [isVisible, setIsVisible] = useState(false)

  // Show only once per session
  useEffect(() => {
    const hasShown = sessionStorage.getItem('discountShown')
    if (!hasShown) {
      const timer = setTimeout(() => setIsVisible(true), 2000) // show after 2s
      return () => clearTimeout(timer)
    }
  }, [])

  // Exit intent
  useEffect(() => {
    const handleMouseOut = (e) => {
      if (e.clientY < 10 && !sessionStorage.getItem('discountShown')) {
        setIsVisible(true)
      }
    }
    window.addEventListener('mouseout', handleMouseOut)
    return () => window.removeEventListener('mouseout', handleMouseOut)
  }, [])

  // Scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const scrollThreshold = document.body.scrollHeight * 0.5
      if (
        scrollPosition >= scrollThreshold &&
        !sessionStorage.getItem('discountShown')
      ) {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('discountShown', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
        >
          <div className="bg-white w-full max-w-md rounded-2xl p-6 text-center relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              🎉 Special Discount Alert!
            </h2>
            <p className="text-gray-600 mb-4">
              We’re offering exclusive deals for new clients. Let’s help grow your business — fast!
            </p>
            <a
              href="/contact"
              onClick={handleClose}
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Claim Offer
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}