"use client";

import { useEffect } from "react";

export default function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="overflow-x-hidden relative px-4 py-16 container mx-auto">
      {/* SEO-friendly intro text */}
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Book Your Free Consultation with OmoolaEx
        </h1>
        <p className="text-gray-600 text-lg">
          Schedule a free 30-minute consultation with our experts in{" "}
          <strong>IT consulting</strong>,{" "}
          <strong>web development</strong>, and{" "}
          <strong>brand design</strong>. Choose your preferred date and time
          below to get started.
        </p>
      </section>

      {/* Calendly Embed */}
      <div
        className="calendly-inline-widget shadow-lg rounded-lg border border-gray-200"
        data-url="https://calendly.com/omoolaex-info/45min?hide_gdpr_banner=1"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
}
