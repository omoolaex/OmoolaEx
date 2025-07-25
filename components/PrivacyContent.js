// app/privacy/PrivacyContent.jsx

"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";

const tocLinks = [
  { id: "intro", label: "1. Introduction" },
  { id: "data-we-collect", label: "2. Data We Collect" },
  { id: "how-we-use", label: "3. How We Use Data" },
  { id: "data-sharing", label: "4. Data Sharing & Disclosure" },
  { id: "security", label: "5. Data Security" },
  { id: "rights", label: "6. Your Rights" },
  { id: "cookies", label: "7. Cookies & Tracking" },
  { id: "changes", label: "8. Policy Updates" },
  { id: "contact", label: "9. Contact Us" },
];

export default function PrivacyContent() {
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
        <aside className="w-64 hidden lg:block sticky top-24 h-fit">
          <nav className="space-y-2 text-sm border-l-2 border-gray-200 pl-4">
            {tocLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block hover:text-blue-600 transition ${
                  activeId === link.id ? "text-blue-600 font-medium" : "text-gray-600"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-10">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: July 24, 2025</p>

          <div className="space-y-10 text-base leading-7">
            <section id="intro">
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p>
                At OmoolaEx, your privacy is a priority. This policy outlines how we
                collect, use, and protect your information when you interact with our
                website or services.
              </p>
            </section>

            <section id="data-we-collect">
              <h2 className="text-xl font-semibold mb-2">2. Data We Collect</h2>
              <p>We may collect the following types of data:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Personal information (e.g., name, email address)</li>
                <li>Technical data (e.g., IP address, browser type)</li>
                <li>Usage data (e.g., pages visited, time spent)</li>
              </ul>
            </section>

            <section id="how-we-use">
              <h2 className="text-xl font-semibold mb-2">3. How We Use Data</h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide and improve our services</li>
                <li>Respond to inquiries and support needs</li>
                <li>Send relevant updates or marketing (if consented)</li>
              </ul>
            </section>

            <section id="data-sharing">
              <h2 className="text-xl font-semibold mb-2">4. Data Sharing & Disclosure</h2>
              <p>
                We do not sell or rent your data. We may share data with trusted partners
                who assist in delivering our services, under strict confidentiality.
              </p>
            </section>

            <section id="security">
              <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data
                against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal data. Contact
                us to exercise these rights or if you have privacy-related concerns.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-xl font-semibold mb-2">7. Cookies & Tracking</h2>
              <p>
                We use cookies to enhance your experience. You can control cookie settings
                via your browser preferences.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-xl font-semibold mb-2">8. Policy Updates</h2>
              <p>
                We may update this policy occasionally. Changes will be posted here and
                reflected with an updated effective date.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
              <p>
                If you have questions about this policy, reach us at{" "}
                <a href="mailto:hello@omoolaex.com" className="text-blue-600 underline">
                  hello@omoolaex.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}