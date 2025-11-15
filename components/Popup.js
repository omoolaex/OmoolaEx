"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function NewsletterPopup() {
  const [show, setShow] = useState(false)
  const [animate, setAnimate] = useState(false)
  const modalRef = useRef(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletterPopupDismissed")
    if (dismissed) {
      const expiry = new Date(JSON.parse(dismissed))
      if (expiry > new Date()) return
    }

    const timer = setTimeout(() => setShow(true), 10000)

    return () => clearTimeout(timer)
  }, [])

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
      expiry.setDate(expiry.getDate() + 7)
      localStorage.setItem("newsletterPopupDismissed", JSON.stringify(expiry))
    }, 200)
  }

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dismiss()
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const json = await res.json()

      if (json.success) {
        setStatus({ ok: true, msg: "You're in. 🎉" })
        setEmail("")
        setTimeout(() => dismiss(), 1200)
      } else {
        setStatus({ ok: false, msg: json.message || "Something went wrong." })
      }
    } catch (err) {
      setStatus({ ok: false, msg: "Network error. Try again." })
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-pink-100/60 backdrop-blur-sm transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 transform ${
          animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image */}
          <div className="h-56 md:h-auto relative">
            <Image
              src="/images/popups/process-audit.png"
              alt="Newsletter visual"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Get the latest insights & updates
            </h2>

            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Join our monthly circle of founders, product leaders, and growth-minded teams. 
              Expect high-value tech insights, strategic frameworks, and industry updates — no spam, ever.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">

              {/* Name field */}
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />

              {/* Email field */}
              <input
                type="email"
                required
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />

              {/* Status message */}
              {status && (
                <p
                  className={`text-sm ${
                    status.ok ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.msg}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Joining..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
