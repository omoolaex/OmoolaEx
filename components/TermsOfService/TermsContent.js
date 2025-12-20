"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";

const tocLinks = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Services Overview" },
  { id: "responsibilities", label: "3. User Responsibilities" },
  { id: "intellectual", label: "4. Intellectual Property" },
  { id: "liability", label: "5. Limitation of Liability" },
  { id: "privacy", label: "6. Data Protection & Privacy" },
  { id: "changes", label: "7. Changes to Terms" },
  { id: "law", label: "8. Governing Law" },
  { id: "contact", label: "9. Contact Information" },
];

export default function TermsContent() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 1 }
    );

    tocLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero />

      <section className="flex max-w-7xl mx-auto px-4 py-16 text-gray-800 gap-12">
        {/* Sidebar TOC */}
        <aside className="w-64 hidden lg:block sticky top-24 h-fit">
          <nav className="space-y-2 text-sm border-l-2 border-gray-200 pl-4">
            {tocLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block hover:text-blue-600 transition-all ${
                  activeId === link.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          <p className="text-sm text-gray-500">Last updated: December 12, 2025</p>

          <div className="space-y-10 text-base leading-7">
            {/* 1. ACCEPTANCE */}
            <section id="acceptance">
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the OmoolaEx IT Consultancy Ltd website, digital 
                platforms, or any of our services, you agree to be bound by these Terms 
                and Conditions. If you do not agree with any part of these Terms, you 
                should discontinue use of the website and our services immediately.
              </p>
              <p className="mt-3">
                These Terms constitute a legally binding agreement between you 
                (“User”, “Client”, “you”) and OmoolaEx IT Consultancy Ltd (“OmoolaEx”, 
                “we”, “our”, or “us”).
              </p>
            </section>

            {/* 2. SERVICES OVERVIEW */}
            <section id="services">
              <h2 className="text-xl font-semibold mb-2">2. Services Overview</h2>
              <p>
                OmoolaEx provides IT consulting, strategy, software development, cloud 
                solutions, digital transformation, cybersecurity advisory, branding, and 
                other technology-based professional services. Specific terms for 
                client-engaged projects may be governed by a separate Service Agreement, 
                Master Contract, or Statement of Work (SOW).
              </p>
              <p className="mt-3">
                Your use of our website is provided “as-is” for informational and 
                engagement purposes.
              </p>
            </section>

            {/* 3. USER RESPONSIBILITIES */}
            <section id="responsibilities">
              <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
              <p>
                When using our website or engaging our services, you agree to:
              </p>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide accurate and complete information when requested</li>
                <li>Use our website and services in compliance with Nigerian law</li>
                <li>Not attempt unauthorized access to our systems, platforms, or data</li>
                <li>Not misuse OmoolaEx intellectual property, content, or trademarks</li>
                <li>Not submit harmful code, malware, or malicious activities</li>
              </ul>

              <p className="mt-3">
                Violations may result in restricted access, termination of service, or 
                legal action.
              </p>
            </section>

            {/* 4. INTELLECTUAL PROPERTY */}
            <section id="intellectual">
              <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
              <p>
                All content on this website—including but not limited to text, graphics, 
                logos, icons, software, frameworks, methodology, and branding—is the 
                exclusive property of OmoolaEx IT Consultancy Ltd and is protected under 
                the Nigerian Trademarks, Patents and Designs Act.
              </p>
              <p className="mt-3">
                Users may not copy, reproduce, distribute, modify, or exploit any part of 
                the website or its materials without prior written consent from OmoolaEx.
              </p>
            </section>

            {/* 5. LIMITATION OF LIABILITY */}
            <section id="liability">
              <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted under Nigerian law, OmoolaEx shall not be 
                liable for any direct, indirect, incidental, consequential, or punitive 
                damages arising from:
              </p>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use of or inability to use our website</li>
                <li>Errors, omissions, or inaccuracies in website content</li>
                <li>Third-party actions, failures, or service interruptions</li>
                <li>Security breaches beyond our reasonable control</li>
              </ul>

              <p className="mt-3">
                Nothing in these Terms limits liability where prohibited under Nigerian 
                law.
              </p>
            </section>

            {/* 6. DATA PROTECTION */}
            <section id="privacy">
              <h2 className="text-xl font-semibold mb-2">6. Data Protection & Privacy</h2>
              <p>
                OmoolaEx processes Personal Data in compliance with the Nigeria Data 
                Protection Regulation (NDPR) and adheres to global data protection best 
                practices. Our full data handling practices are detailed in our{" "}
                <a href="/privacy-policy" className="text-blue-600 underline">
                  Privacy Policy
                </a>.
              </p>
              <p className="mt-3">
                By using our website, you consent to the collection and processing of 
                Personal Data as described in our Privacy Policy.
              </p>
            </section>

            {/* 7. CHANGES TO TERMS */}
            <section id="changes">
              <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
              <p>
                OmoolaEx reserves the right to modify or update these Terms at any time. 
                Updates will be posted on this page with a revised “Last Updated” date. 
                Continued use of our website after changes are published constitutes your 
                acceptance of the updated Terms.
              </p>
            </section>

            {/* 8. GOVERNING LAW */}
            <section id="law">
              <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
              <p>
                These Terms & Conditions are governed exclusively by the laws of the 
                Federal Republic of Nigeria, including but not limited to CAMA 2020, 
                NDPR 2019, and the Cybercrimes (Prohibition, Prevention, etc.) Act 2015.
              </p>
              <p className="mt-3">
                Any disputes shall be resolved by Nigerian courts with appropriate 
                jurisdiction.
              </p>
            </section>

            {/* 9. CONTACT */}
            <section id="contact">
              <h2 className="text-xl font-semibold mb-2">9. Contact Information</h2>
              <p>
                For inquiries, concerns, or clarifications regarding these Terms, contact:
              </p>

              <p className="mt-2">
                <strong>OmoolaEx IT Consultancy Ltd</strong><br />
                Email:{" "}
                <a
                  href="mailto:info@omoolaex.com.ng"
                  className="text-blue-600 underline"
                >
                  info@omoolaex.com.ng
                </a>
                <br />
                Website:{" "}
                <a
                  href="https://omoolaex.com.ng/contact"
                  className="text-blue-600 underline"
                > 
                  www.omoolaex.com.ng
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
