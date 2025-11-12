import React from "react";
import Script from "next/script";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

import DigitalSolutionsHero from "@/components/Services/DigitalSolutions-SystemsIntegration/hero";
import ChallengeSection from "@/components/Services/DigitalSolutions-SystemsIntegration/Challenge";
import DevelopmentApproach from "@/components/Services/DigitalSolutions-SystemsIntegration/Approach";
import DigitalSolutionServices from "@/components/Services/DigitalSolutions-SystemsIntegration/DigitalSolutionServices";
import WhoNeedsSection from "@/components/Services/DigitalSolutions-SystemsIntegration/WhoNeeds";
import WhyChooseSection from "@/components/Services/DigitalSolutions-SystemsIntegration/WhyChoose";
import HowWeWorkSection from "@/components/Services/DigitalSolutions-SystemsIntegration/HowWeWork";
import TechnologiesSection from "@/components/Services/DigitalSolutions-SystemsIntegration/Technologies";
import CTASection from "@/components/Services/DigitalSolutions-SystemsIntegration/CTASection";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ SEO Metadata (Server-safe)
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Custom Software Development & Systems Integration | OmoolaEx Nigeria",
  description:
    "OmoolaEx builds scalable digital systems — from websites and mobile apps to enterprise software and seamless integrations. Tailored, modern, and built to grow your business.",
  keywords: [
    "Custom software development Nigeria",
    "Website development Lagos",
    "Web application development Nigeria",
    "Systems integration services Nigeria",
    "Software solutions Nigeria",
    "Enterprise software Lagos",
    "Business automation Nigeria",
  ],
  alternates: {
    canonical: `${siteUrl}/services/digital-solutions-systems-integration`,
  },
  openGraph: {
    title: "Custom Software Development & Systems Integration | OmoolaEx Nigeria",
    description:
      "We deliver custom digital solutions — websites, mobile apps, and integrated software that scale with your business.",
    url: `${siteUrl}/services/digital-solutions-systems-integration`,
    siteName: "OmoolaEx",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Digital Solutions & Systems Integration Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | Custom Software Development Nigeria",
    description:
      "Website, web app, and systems integration experts helping Nigerian businesses grow with technology.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

// ✅ Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmoolaEx IT Consultancy Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/og-image.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+2348060000000",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/omoolaex-it-consulting-company",
    "https://twitter.com/omoolaex",
    "https://www.instagram.com/omoolaex_",
    "https://www.facebook.com/OmoolaEx",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lagos, Nigeria",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

// ✅ Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development & Systems Integration",
  description:
    "Professional custom software development, web application development, and systems integration services in Nigeria by OmoolaEx.",
  provider: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: `${siteUrl}/images/og-image.png`,
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  serviceType: [
    "Custom software development",
    "Website development",
    "Web application development",
    "Systems integration",
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/contact`,
    price: "Contact for Quote",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "98",
  },
};

// ✅ FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is custom software development in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Custom software development means building solutions tailored to your business workflows, user needs, and system integrations for better efficiency.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide systems integration services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OmoolaEx integrates multiple platforms, APIs, and tools so your business systems can communicate seamlessly and reduce manual work.",
      },
    },
    {
      "@type": "Question",
      name: "Can you develop websites and web applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We design and build websites and web apps that are fast, responsive, and optimized for conversion and scalability.",
      },
    },
  ],
};

// ✅ Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${siteUrl}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Digital Solutions & Systems Integration",
      item: `${siteUrl}/services/digital-solutions-systems-integration`,
    },
  ],
};

// ✅ Event Tracking Script
const eventTrackingScript = `
  document.addEventListener("DOMContentLoaded", function () {
    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"], a[href*="bookings"]').forEach(el => {
      el.addEventListener("click", () => {
        window.gtag && window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: "Digital Solutions CTA"
        });
      });
    });

    // Track scroll depth
    let tracked = false;
    window.addEventListener("scroll", () => {
      if (!tracked && (window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.5) {
        tracked = true;
        window.gtag && window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50% Scroll - Digital Solutions Page"
        });
      }
    });
  });
`;

export default function DigitalSolutionsPage() {
  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="schema-org-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-org-service"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-org-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-org-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ✅ Event Tracking */}
      <Script
        id="event-tracking-digital-solutions"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventTrackingScript }}
      />

      {/* ✅ Page Analytics */}
      <PageViewTracker
        title="Custom Software Development & Systems Integration | OmoolaEx"
        path="/services/digital-solutions-systems-integration"
        location={`${siteUrl}/services/digital-solutions-systems-integration`}
      />

      {/* ✅ Page Sections */}
      <DigitalSolutionsHero />
      <ChallengeSection />
      <DevelopmentApproach />
      <DigitalSolutionServices />
      <WhoNeedsSection />
      <WhyChooseSection />
      <HowWeWorkSection />
      <TechnologiesSection />
      <CTASection />
    </>
  );
}
