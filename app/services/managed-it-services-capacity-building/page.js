import Script from "next/script";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import ManagedITHero from "@/components/Services/ManagedIT/Hero";
import ITManagementChallenge from "@/components/Services/ManagedIT/Challenge";
import ManagedServicesApproach from "@/components/Services/ManagedIT/Approach";
import ManagedITServices from "@/components/Services/ManagedIT/Services";
import WhoNeedsManagedIT from "@/components/Services/ManagedIT/WhoNeedsUs";
import WhyChooseOmoolaExManaged from "@/components/Services/ManagedIT/WhyChooseUs";
import HowWeWorkManaged from "@/components/Services/ManagedIT/HowWeWork";
import TrainingTopicsSection from "@/components/Services/ManagedIT/TrainingTopics";
import ManagedITCTA from "@/components/Services/ManagedIT/ManagedITCTA";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ SEO Metadata
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Managed IT Services & Training | OmoolaEx Nigeria",
  description:
    "OmoolaEx provides managed IT support and capacity-building training in Lagos and across Nigeria — helping businesses maintain secure, efficient systems and upskill their teams.",
  keywords: [
    "Managed IT services Nigeria",
    "IT support Lagos",
    "Cybersecurity training Nigeria",
    "Digital skills training Lagos",
    "Technical support Nigeria",
    "IT management Nigeria",
    "Staff training on digital tools",
  ],
  alternates: {
    canonical: `${siteUrl}/services/managed-it-services-and-training`,
  },
  openGraph: {
    title: "Managed IT Services & Training | OmoolaEx Nigeria",
    description:
      "Reliable IT support and capacity-building training for businesses in Nigeria — from system monitoring and maintenance to cybersecurity and digital literacy programs.",
    url: `${siteUrl}/services/managed-it-services-and-training`,
    siteName: "OmoolaEx",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Managed IT Services and Training Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | Managed IT Services & Training in Nigeria",
    description:
      "Comprehensive IT management, cybersecurity awareness, and digital skills training for Nigerian businesses.",
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
  name: "Managed IT Services & Training",
  description:
    "OmoolaEx offers managed IT services, cybersecurity awareness training, and digital skills capacity building to help Nigerian businesses operate securely and efficiently.",
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
    "Managed IT services",
    "Cybersecurity training",
    "Digital literacy training",
    "Technical support",
    "IT management",
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
    ratingCount: "87",
  },
};

// ✅ FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What do managed IT services include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Managed IT services include proactive system monitoring, maintenance, help desk support, data backup, and security management — allowing your business to run smoothly without in-house IT staff.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer cybersecurity training for staff?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide practical cybersecurity awareness training covering phishing prevention, password management, data handling, and safe browsing practices.",
      },
    },
    {
      "@type": "Question",
      name: "Can you train our team on digital tools we already use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We deliver customized training based on your existing tools — from Microsoft 365 and Google Workspace to CRM systems and industry-specific software.",
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
      name: "Managed IT Services & Training",
      item: `${siteUrl}/services/managed-it-services-and-training`,
    },
  ],
};

// ✅ Event Tracking Script
const eventTrackingScript = `
  document.addEventListener("DOMContentLoaded", function () {
    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"]').forEach(el => {
      el.addEventListener("click", () => {
        window.gtag && window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: "Managed IT CTA"
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
          event_label: "50% Scroll - Managed IT Page"
        });
      }
    });
  });
`;

// ✅ Page Component
export default function ManagedITPage() {
  return (
    <>
      {/* Structured Data */}
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

      {/* Event Tracking */}
      <Script
        id="event-tracking-managed-it"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventTrackingScript }}
      />

      {/* Page Analytics */}
      <PageViewTracker
        title="Managed IT Services & Training | OmoolaEx Nigeria"
        path="/services/managed-it-services-and-training"
        location={`${siteUrl}/services/managed-it-services-and-training`}
      />
      <ManagedITHero />
      <ITManagementChallenge />
      <ManagedServicesApproach />
      <ManagedITServices />
      <WhoNeedsManagedIT />
      <WhyChooseOmoolaExManaged />
      <HowWeWorkManaged />
      <TrainingTopicsSection />
      <ManagedITCTA />
    </>
  );
}
