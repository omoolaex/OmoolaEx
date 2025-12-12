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
          <p className="text-sm text-gray-500">Last updated: December 12, 2025</p>

          <div className="space-y-10 text-base leading-7">

            {/* INTRODUCTION */}
            <section id="intro">
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p>
                OmoolaEx IT Consultancy Ltd (“OmoolaEx”, “we”, “our”, or “us”) is committed 
                to protecting the privacy, confidentiality, and security of Personal Data 
                processed through our websites, digital platforms, and professional 
                consulting services. This Privacy Policy outlines how we collect, use, 
                store, disclose, and safeguard Personal Data in compliance with the 
                Nigeria Data Protection Regulation (NDPR) and global data protection 
                standards.
              </p>
              <p className="mt-3">
                By interacting with our website, submitting information, or engaging our 
                services, you consent to the practices described in this Policy.
              </p>
            </section>

            {/* DATA WE COLLECT */}
            <section id="data-we-collect">
              <h2 className="text-xl font-semibold mb-2">2. Data We Collect</h2>

              <p>We collect Personal Data necessary for service delivery, communication, and compliance.</p>

              <h3 className="font-medium mt-4">A. Information You Provide Directly</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name, email address, phone number, company details</li>
                <li>Project documentation and access credentials required for service execution</li>
                <li>Billing, invoicing, and contractual details</li>
                <li>Records of communication via email, calls, or support requests</li>
              </ul>

              <h3 className="font-medium mt-4">B. Information Collected Automatically</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>IP address, browser type, operating system, device information</li>
                <li>Pages viewed, navigation patterns, time spent, referring URLs</li>
                <li>Approximate location and technical metadata</li>
              </ul>

              <h3 className="font-medium mt-4">C. Information from Third Parties</h3>
              <p className="mt-2">
                We may receive verified information from business partners, analytics 
                providers, public databases, or referral networks. All such sources 
                must lawfully share data under NDPR-compliant conditions.
              </p>
            </section>

            {/* HOW WE USE DATA */}
            <section id="how-we-use">
              <h2 className="text-xl font-semibold mb-2">3. How We Use Data</h2>
              <p>We process Personal Data for the following lawful purposes:</p>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To deliver and manage contracted IT consulting and digital services</li>
                <li>To communicate project updates, technical notices, and support responses</li>
                <li>To process payments, issue invoices, and maintain statutory tax compliance (VAT/WHT)</li>
                <li>To improve website functionality, security, and user experience</li>
                <li>To prevent fraud, enhance cybersecurity, and support compliance audits</li>
                <li>To send marketing materials where explicit consent or legitimate interest applies</li>
              </ul>
            </section>

            {/* DATA SHARING */}
            <section id="data-sharing">
              <h2 className="text-xl font-semibold mb-2">4. Data Sharing & Disclosure</h2>

              <p>
                OmoolaEx does not sell or trade Personal Data. We only disclose information 
                under controlled and lawful conditions:
              </p>

              <h3 className="font-medium mt-4">A. Trusted Service Providers (Sub-Processors)</h3>
              <p className="mt-2">
                These include cloud hosting platforms, security systems, analytics tools, 
                and CRM applications. All providers operate under NDPR-compliant Data 
                Processing Agreements.
              </p>

              <h3 className="font-medium mt-4">B. Regulatory and Legal Compliance</h3>
              <p className="mt-2">
                We may disclose Personal Data to the Nigeria Data Protection Commission 
                (NDPC), law enforcement, courts, or FIRS where legally required.
              </p>

              <h3 className="font-medium mt-4">C. Business Transfers</h3>
              <p className="mt-2">
                In the event of a merger, restructuring, or acquisition, Personal Data may 
                be transferred to the successor entity under equivalent privacy safeguards.
              </p>
            </section>

            {/* SECURITY */}
            <section id="security">
              <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to 
                safeguard Personal Data, including:
              </p>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Encryption of data at rest and in transit</li>
                <li>Strict access controls based on the principle of least privilege</li>
                <li>Secure cloud infrastructure with firewalls and malware protection</li>
                <li>Regular backups and disaster recovery practices</li>
                <li>Mandatory confidentiality and data protection protocols for all personnel</li>
              </ul>

              <p className="mt-3">
                While we maintain strong security standards, no electronic transmission 
                method is completely without risk.
              </p>
            </section>

            {/* RIGHTS */}
            <section id="rights">
              <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
              <p>
                Under the NDPR, you have the following rights regarding your Personal Data:
              </p>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Right to access the Personal Data we hold about you</li>
                <li>Right to request corrections to inaccurate or incomplete information</li>
                <li>Right to request deletion where applicable (“Right to be Forgotten”)</li>
                <li>Right to withdraw previously given consent</li>
                <li>Right to object to processing for marketing or legitimate interest</li>
                <li>Right to request data portability in a machine-readable format</li>
              </ul>

              <p className="mt-3">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@omoolaex.com.ng" className="text-blue-600 underline">
                  privacy@omoolaex.com.ng
                </a>.
              </p>
            </section>

            {/* COOKIES */}
            <section id="cookies">
              <h2 className="text-xl font-semibold mb-2">7. Cookies & Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance user experience, 
                personalize content, analyze website performance, and support security 
                features.
              </p>
              <p className="mt-3">
                You may disable cookies through your browser settings, but certain 
                website features may become limited as a result.
              </p>
            </section>

            {/* POLICY UPDATES */}
            <section id="changes">
              <h2 className="text-xl font-semibold mb-2">8. Policy Updates</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our 
                services, legal requirements, or security practices. The “Last Updated” 
                date will always indicate the latest revision.
              </p>
            </section>

            {/* CONTACT */}
            <section id="contact">
              <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
              <p>
                For privacy inquiries, data rights requests, or complaints, contact our 
                Data Protection Officer at{" "}
                <a href="mailto:privacy@omoolaex.com.ng" className="text-blue-600 underline">
                  privacy@omoolaex.com.ng
                </a>.
              </p>
              <p className="mt-3">
                If you are not satisfied with our response, you may contact the Nigeria 
                Data Protection Commission (NDPC).
              </p>
            </section>

          </div>
        </div>
      </section>
    </>
  );
}
