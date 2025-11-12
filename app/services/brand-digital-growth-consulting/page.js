import React from "react";
import Script from "next/script";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

// Page sections
import BrandGrowthHero from "@/components/Services/BrandDigitalConsulting/hero";
import BrandGrowthChallenge from "@/components/Services/BrandDigitalConsulting/BrandGrowthChallenge";
import BrandGrowthApproach from "@/components/Services/BrandDigitalConsulting/BrandGrowthApproach";
import BrandGrowthServices from "@/components/Services/BrandDigitalConsulting/BrandGrowthServices";
import WhoNeedsBrandGrowth from "@/components/Services/BrandDigitalConsulting/WhoNeedsBrandGrowth";
import WhyChooseUs from "@/components/Services/BrandDigitalConsulting/WhyChooseUs";
import HowWeWorkBrandGrowth from "@/components/Services/BrandDigitalConsulting/HowWeWork";
import BrandGrowthCTA from "@/components/Services/BrandDigitalConsulting/BrandGrowthCTA";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ SEO Metadata
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brand & Digital Growth Consulting | OmoolaEx Nigeria",
  description:
    "Build a brand that stands out and grows. OmoolaEx helps businesses in Nigeria with brand strategy, digital marketing, and data-driven growth consulting.",
  keywords: [
    "brand consulting Nigeria",
    "digital marketing consulting Nigeria",
    "brand strategy Lagos",
    "business growth consulting Nigeria",
    "digital branding Nigeria",
  ],
  alternates: {
    canonical: `${siteUrl}/services/brand-digital-growth-consulting`,
  },
  openGraph: {
    title: "Brand & Digital Growth Consulting | OmoolaEx",
    description:
      "OmoolaEx helps businesses grow through brand strategy, digital marketing, and data-driven consulting for measurable results.",
    url: `${siteUrl}/services/brand-digital-growth-consulting`,
    siteName: "OmoolaEx",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Brand & Digital Growth Consulting",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | Brand & Digital Growth Consulting Nigeria",
    description:
      "Partner with OmoolaEx for brand strategy, marketing consulting, and growth-driven digital transformation.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

// ✅ Structured Data (Schema.org)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand & Digital Growth Consulting",
  description:
    "Strategic brand and digital marketing consulting for Nigerian businesses by OmoolaEx, helping companies stand out and achieve measurable growth.",
  provider: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: `${siteUrl}/images/og-image.png`,
    sameAs: [
      "https://www.linkedin.com/company/omoolaex-it-consulting-company",
      "https://twitter.com/omoolaex",
      "https://www.instagram.com/omoolaex_",
      "https://www.facebook.com/OmoolaEx",
    ],
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  serviceType: [
    "brand consulting Nigeria",
    "digital marketing consulting Nigeria",
    "growth strategy consulting",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "105",
  },
};

// ✅ FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does brand consulting in Nigeria involve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brand consulting involves developing your visual identity, messaging, and positioning strategy to help your business stand out and connect with your target audience.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide digital marketing strategy and management?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OmoolaEx helps businesses create and manage digital marketing strategies across social media, content, and paid channels for measurable growth.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help rebrand my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We offer full rebranding services including identity redesign, market repositioning, and communication strategy for both startups and established businesses.",
      },
    },
  ],
};

// ✅ Event Tracking
const eventTrackingScript = `
  document.addEventListener("DOMContentLoaded", function () {
    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"]').forEach(el => {
      el.addEventListener("click", () => {
        window.gtag && window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: "Brand Growth CTA"
        });
      });
    });

    // Track scroll depth
    let scrollTracked = false;
    window.addEventListener("scroll", () => {
      if (!scrollTracked && window.scrollY / document.body.scrollHeight > 0.5) {
        scrollTracked = true;
        window.gtag && window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50% Scroll - Brand Growth Page"
        });
      }
    });
  });
`;

export default function BrandGrowthPage() {
  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-brand-growth"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="faq-schema-brand-growth"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ Event Tracking */}
      <Script
        id="event-tracking-brand-growth"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventTrackingScript }}
      />

      {/* ✅ Page Tracking */}
      <PageViewTracker
        title="Brand & Digital Growth Consulting | OmoolaEx"
        path="/services/brand-digital-growth-consulting"
        location={`${siteUrl}/services/brand-digital-growth-consulting`}
      />

      {/* ✅ Page Sections */}
      <BrandGrowthHero />
      <BrandGrowthChallenge />
      <BrandGrowthApproach />
      <BrandGrowthServices />
      <WhoNeedsBrandGrowth />
      <WhyChooseUs />
      <HowWeWorkBrandGrowth />
      <BrandGrowthCTA />
    </>
  );
}
