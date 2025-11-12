import ConsultingApproach from "@/components/Services/ITConsultingAdvisory/ConsultingApproach";
import HeroPrimary from "@/components/Services/ITConsultingAdvisory/HeroPrimary";
import HowWeWork from "@/components/Services/ITConsultingAdvisory/HowWeWork";
import Insight from "@/components/Services/ITConsultingAdvisory/InsightBlock";
import ITConsultingChecklist from "@/components/Services/ITConsultingAdvisory/ITConsultingClientele";
import ITConsultingCTA from "@/components/Services/ITConsultingAdvisory/ITConsultingCTA";
import ITConsultingShowcase from "@/components/Services/ITConsultingAdvisory/ITConsultingShowcase";
import WhyChooseOmoolaExDark from "@/components/Services/ITConsultingAdvisory/WhyChooseOmoolaExDark";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import Script from "next/script";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ SEO Metadata
export const metadata = {
  title: "IT Consulting & Advisory Services | OmoolaEx | Lagos, Nigeria",
  description:
    "OmoolaEx provides expert IT strategy consulting in Nigeria — helping businesses develop tailored technology roadmaps, drive digital transformation, and achieve sustainable growth.",
  keywords: [
    "IT strategy consulting Nigeria",
    "Digital transformation consulting Nigeria",
    "IT advisory services Lagos",
    "Technology strategy consulting",
    "Business IT consulting Nigeria",
  ],
  alternates: {
    canonical: `${siteUrl}/services/it-consulting-advisory`,
  },
  openGraph: {
    title: "IT Consulting & Advisory Services | OmoolaEx",
    description:
      "Trusted IT strategy and advisory services for businesses in Nigeria. We align your technology with your goals for lasting impact.",
    url: `${siteUrl}/services/it-consulting-advisory`,
    siteName: "OmoolaEx",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consulting & Advisory Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | IT Consulting & Advisory in Nigeria",
    description:
      "Partner with OmoolaEx for IT strategy consulting, digital transformation, and technology advisory services in Nigeria.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

// ✅ Structured Data (Schema.org)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IT Consulting & Advisory",
  description:
    "Professional IT strategy consulting and digital transformation advisory services in Nigeria by OmoolaEx.",
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
    "IT strategy consulting Nigeria",
    "Digital transformation consulting Nigeria",
    "Technology strategy consulting",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "98",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Tunde A." },
      datePublished: "2025-01-10",
      reviewBody:
        "OmoolaEx helped us refine our IT strategy and align it with our business goals — true professionals in digital transformation consulting.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
};

// ✅ FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does IT strategy consulting in Nigeria involve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It includes assessing your current systems, defining technology goals, and building a roadmap that aligns with your business growth strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing IT advisory services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OmoolaEx offers long-term advisory partnerships to guide businesses through implementation and continuous digital transformation.",
      },
    },
    {
      "@type": "Question",
      name: "Where does OmoolaEx operate from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We’re based in Lagos, Nigeria, and work with clients across Africa and beyond through both on-site and virtual engagements.",
      },
    },
  ],
};

// ✅ Event Tracking (Google Analytics, Meta Pixel, etc.)
const eventTrackingScript = `
  document.addEventListener("DOMContentLoaded", function () {
    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"]').forEach(el => {
      el.addEventListener("click", () => {
        window.gtag && window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: "IT Consulting CTA"
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
          event_label: "50% Scroll - IT Consulting Page"
        });
      }
    });
  });
`;

export default function ITConsultingPage() {
  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-it-consulting"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-it-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ✅ Event Tracking */}
      <Script
        id="event-tracking-it"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventTrackingScript }}
      />

      {/* ✅ Page Tracking */}
      <PageViewTracker
        title="IT Consulting & Advisory Services | OmoolaEx"
        path="/services/it-consulting-advisory"
        location={`${siteUrl}/services/it-consulting-advisory`}
      />

      {/* ✅ Page Sections */}
      <HeroPrimary />
      <Insight />
      <ConsultingApproach />
      <ITConsultingShowcase />
      <ITConsultingChecklist />
      <WhyChooseOmoolaExDark />
      <HowWeWork />
      <ITConsultingCTA />
    </>
  );
}
