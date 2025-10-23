// app/contact/page.js

import Script from "next/script";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/Contact/ContactFormMap";
import ContactInfo from "@/components/Contact/ContactInfo";
import HeroSection from "@/components/Contact/HeroSection";
import ReasonsSection from "@/components/Contact/ReasonsSection";
import MapSection from "@/components/Contact/MapSection";
import WhatHappensNext from "@/components/Contact/WhatHappensNext";
import ServingArea from "@/components/Contact/ServingArea";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

/* -------------------------------------------------------
   ✅ SEO METADATA
------------------------------------------------------- */
export const metadata = {
  title:
    "Contact Us | OmoolaEx IT Consultancy | Thinking Differently | Lagos, Nigeria",
  description:
    "Connect with OmoolaEx IT Consultancy in Lagos, Nigeria for IT consulting, digital transformation, cloud solutions, and technology advisory. Let’s discuss how we can drive your next innovation.",
  keywords: [
    "Contact OmoolaEx",
    "IT Consulting Nigeria",
    "Digital Transformation Lagos",
    "Cloud Solutions Contact",
    "IT Support Nigeria",
    "Technology Advisory Lagos",
    "OmoolaEx IT Consultancy",
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title:
      "Contact OmoolaEx IT Consultancy | Thinking Differently | Lagos, Nigeria",
    description:
      "Reach out to OmoolaEx for IT consulting, digital transformation, and managed technology services in Nigeria.",
    url: `${siteUrl}/contact`,
    siteName: "OmoolaEx IT Consultancy",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/logo.svg`,
        width: 1200,
        height: 630,
        alt: "Contact OmoolaEx IT Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Contact OmoolaEx IT Consultancy | Lagos, Nigeria | Thinking Differently",
    description:
      "Talk to OmoolaEx IT Consultancy about your IT, cloud, or digital transformation needs. We help businesses across Nigeria innovate with purpose.",
    images: [`${siteUrl}/images/logo.svg`],
    site: "@omoolaex",
  },
};

/* -------------------------------------------------------
   ✅ STRUCTURED DATA (JSON-LD)
------------------------------------------------------- */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact OmoolaEx IT Consultancy",
    description:
      "Get in touch with OmoolaEx IT Consultancy for IT consulting, cloud services, cybersecurity, and digital transformation solutions.",
    url: `${siteUrl}/contact`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    legalName: "OmoolaEx IT Consultancy Ltd",
    slogan: "Thinking Differently",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    foundingDate: "2020",
    sameAs: [
      "https://www.facebook.com/OmoolaEx",
      "https://www.instagram.com/omoolaex_",
      "https://twitter.com/omoolaex",
      "https://www.youtube.com/@omoolaex",
      "https://www.tiktok.com/@omoolaex",
      "https://www.linkedin.com/company/omoolaex-it-consulting-company",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2347089217123",
      contactType: "Customer Service",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi",
      addressLocality: "Ikeja",
      addressRegion: "Lagos",
      postalCode: "100271",
      addressCountry: "NG",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "OmoolaEx IT Consultancy Ltd",
    image: `${siteUrl}/images/logo.svg`,
    url: siteUrl,
    telephone: "+2347089217123",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi",
      addressLocality: "Ikeja",
      addressRegion: "Lagos",
      postalCode: "100271",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.5978,
      longitude: 3.3494,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.facebook.com/OmoolaEx",
      "https://www.linkedin.com/company/omoolaex-it-consulting-company",
    ],
  },
];

/* -------------------------------------------------------
   ✅ COMPONENT
------------------------------------------------------- */
export default function Contact() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Analytics Pageview Tracking */}
      <PageViewTracker
        title="Contact OmoolaEx IT Consultancy | Lagos, Nigeria"
        path="/contact"
        location={`${siteUrl}/contact`}
      />

      {/* ✅ Page Content */}
      <PageHero
        title="Contact OmoolaEx IT Consultancy"
        subtitle="We’re here to help your business transform through technology — reach out today."
      />
      <HeroSection />
      <ReasonsSection />
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <MapSection />
      <WhatHappensNext />
      <ServingArea />
    </main>
  );
}
