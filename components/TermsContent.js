"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";

const tocLinks = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Services Overview" },
  { id: "responsibilities", label: "3. User Responsibilities" },
  { id: "intellectual", label: "4. Intellectual Property" },
  { id: "liability", label: "5. Limitation of Liability" },
  { id: "changes", label: "6. Changes to Terms" },
  { id: "law", label: "7. Governing Law" },
  { id: "contact", label: "8. Contact Information" },
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
          <p className="text-sm text-gray-500">Last updated: July 24, 2025</p>

          <div className="space-y-10 text-base leading-7">
            <section id="acceptance">
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the OmoolaEx website or services, you agree to be
                bound by these terms and conditions. If you do not agree, please do not
                use our site.
              </p>
            </section>

            <section id="services">
              <h2 className="text-xl font-semibold mb-2">2. Services Overview</h2>
              <p>
                OmoolaEx offers IT consulting, web development, brand design, and other
                digital services. These terms apply to all offerings unless stated
                otherwise.
              </p>
            </section>

            <section id="responsibilities">
              <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
              <p>
                Users must provide accurate information, refrain from unauthorized use of
                content, and comply with applicable laws when using our services.
              </p>
            </section>

            <section id="intellectual">
              <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
              <p>
                All content, trademarks, and intellectual property on this site are owned
                by OmoolaEx unless otherwise noted. Reproduction is prohibited without
                permission.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
              <p>
                OmoolaEx is not liable for any damages arising from use or inability to
                use the website or services, to the fullest extent permitted by law.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
              <p>
                We reserve the right to update these terms at any time. Continued use of
                the site after changes implies acceptance of the new terms.
              </p>
            </section>

            <section id="law">
              <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria,
                without regard to conflict of law principles.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold mb-2">8. Contact Information</h2>
              <p>
                For questions about these terms, please contact us at{" "}
                <a href="mailto:info@omoolaex.com.ng" className="text-blue-600 underline">
                  info@omoolaex.com.ng
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
