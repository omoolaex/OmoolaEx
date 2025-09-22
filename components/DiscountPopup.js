"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ConsultationPopup() {
  const [show, setShow] = useState(false)
  const [animate, setAnimate] = useState(false) // for fade-in
  const modalRef = useRef(null)

  useEffect(() => {
    // Check dismissal in localStorage
    const dismissed = localStorage.getItem("consultationPopupDismissed")
    if (dismissed) {
      const expiry = new Date(JSON.parse(dismissed))
      if (expiry > new Date()) return // still valid
    }

    // Timer trigger (5–10s random)
    const timer = setTimeout(() => setShow(true), 5000 + Math.random() * 5000)

    // Scroll trigger
    const onScroll = () => {
      const scrolled =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight
      if (scrolled >= 0.4) {
        setShow(true)
        window.removeEventListener("scroll", onScroll)
      }
    }
    window.addEventListener("scroll", onScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Trigger animation after mount
  useEffect(() => {
    if (show) {
      const frame = requestAnimationFrame(() => setAnimate(true))
      return () => cancelAnimationFrame(frame)
    } else {
      setAnimate(false)
    }
  }, [show])

  const dismiss = () => {
    setAnimate(false)
    setTimeout(() => {
      setShow(false)
      const expiry = new Date()
      expiry.setDate(expiry.getDate() + 7) // 7 days ahead
      localStorage.setItem("consultationPopupDismissed", JSON.stringify(expiry))
    }, 200) // wait for fade-out
  }

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dismiss()
    }
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md transform rounded-2xl bg-white shadow-lg transition-all duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-white hover:text-gray-700"
        >
          ✕
        </button>

        {/* Image banner */}
        <div className="overflow-hidden rounded-t-2xl">
          <Image
            src="/images/popups/popup-collaboration.png"
            alt="Collaboration"
            width={600}
            height={200}
            className="h-48 w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 text-left">
          <h2 className="mb-2 text-lg font-bold text-blue-700 sm:text-3xl">
            Strong digital foundations, without boundaries
          </h2>
          <p className="mb-4 text-sm text-gray-700 sm:text-base">
            Start your OmoolaEx journey today with a free consultation.
          </p>

          <Link
            href="/bookings"
            onClick={dismiss}
            className="block w-full rounded-lg text-center bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Book a Free Consult
          </Link>

          <p className="mt-3 text-xs text-gray-500 text-center">
            No pressure. Just clear guidance.
          </p>
        </div>
      </div>
    </div>
  )
}
