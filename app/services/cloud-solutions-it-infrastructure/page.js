import Script from "next/script";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import CloudSolutionsHero from "@/components/Services/CloudSolutions-ITInfrastructure/Hero";
import CloudSolutionChallenge from "@/components/Services/CloudSolutions-ITInfrastructure/Challenge";
import CloudInfrastructureApproach from "@/components/Services/CloudSolutions-ITInfrastructure/Approach";
import CloudServices from "@/components/Services/CloudSolutions-ITInfrastructure/Services";
import WhoNeedsCloudSolutions from "@/components/Services/CloudSolutions-ITInfrastructure/WhoNeeds";
import WhyChooseOmoolaEx from "@/components/Services/CloudSolutions-ITInfrastructure/WhyChooseUs";
import HowWeWork from "@/components/Services/CloudSolutions-ITInfrastructure/HowWeWork";
import TechnologiesSection from "@/components/Services/CloudSolutions-ITInfrastructure/CloudPlatfroms";
import CloudSolutionsCTA from "@/components/Services/CloudSolutions-ITInfrastructure/CloudSolutionsCTA";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ SEO Metadata
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cloud Solutions & IT Infrastructure Services | OmoolaEx Nigeria",
  description:
    "OmoolaEx delivers reliable cloud migration, IT infrastructure, and data security solutions for Nigerian businesses — helping you scale with confidence.",
  keywords: [
    "Cloud migration services Nigeria",
    "Cloud computing services Nigeria",
    "Cloud solutions Nigeria",
    "IT infrastructure services Lagos",
    "Data backup solutions Nigeria",
    "Disaster recovery Lagos",
    "Cloud security Nigeria",
  ],
  alternates: {
    canonical: `${siteUrl}/services/cloud-solutions-it-infrastructure`,
  },
  openGraph: {
    title: "Cloud Solutions & IT Infrastructure Services | OmoolaEx Nigeria",
    description:
      "Cloud migration, infrastructure setup, and data protection for modern Nigerian businesses — powered by OmoolaEx.",
    url: `${siteUrl}/services/cloud-solutions-it-infrastructure`,
    siteName: "OmoolaEx",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/omoolaex-cloud.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Cloud Solutions & IT Infrastructure Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | Cloud Solutions & IT Infrastructure Nigeria",
    description:
      "Experts in cloud migration, infrastructure optimization, and data protection for Nigerian businesses.",
    images: [`${siteUrl}/images/omoolaex-cloud.jpg`],
    site: "@omoolaex",
  },
};

// ✅ Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmoolaEx IT Consultancy Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/omoolaex-logo.jpg`,
  sameAs: [
    "https://www.linkedin.com/company/omoolaex-it-consulting-company",
    "https://twitter.com/omoolaex",
    "https://www.instagram.com/omoolaex_",
    "https://www.facebook.com/OmoolaEx",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+2348060000000",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
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
  name: "Cloud Solutions & IT Infrastructure Services",
  description:
    "Professional cloud migration, infrastructure optimization, and data security services in Nigeria by OmoolaEx.",
  provider: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: `${siteUrl}/images/omoolaex-logo.jpg`,
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  serviceType: [
    "Cloud migration",
    "Cloud infrastructure setup",
    "Data security",
    "Backup and disaster recovery",
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
    ratingCount: "95",
  },
};

// ✅ FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are cloud migration services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cloud migration services help move your data, applications, and infrastructure from on-premise or legacy systems to cloud environments securely and efficiently.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer IT infrastructure setup in Lagos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, OmoolaEx provides IT infrastructure design, setup, and optimization services for businesses across Lagos and Nigeria.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help with data backup and disaster recovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We design and implement robust backup and disaster recovery solutions to ensure business continuity and protect against data loss.",
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
      name: "Cloud Solutions & IT Infrastructure",
      item: `${siteUrl}/services/cloud-solutions-it-infrastructure`,
    },
  ],
};

// ✅ Event Tracking
const eventTrackingScript = `
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href*="contact"], a[href*="bookings"]').forEach(el => {
      el.addEventListener("click", () => {
        window.gtag && window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: "Cloud Solutions CTA"
        });
      });
    });

    let tracked = false;
    window.addEventListener("scroll", () => {
      if (!tracked && (window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.5) {
        tracked = true;
        window.gtag && window.gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50% Scroll - Cloud Solutions Page"
        });
      }
    });
  });
`;

export default function CloudSolutionsPage() {
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
      <Script
        id="event-tracking-cloud-solutions"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventTrackingScript }}
      />

      {/* ✅ Page Analytics */}
      <PageViewTracker
        title="Cloud Solutions & IT Infrastructure Services | OmoolaEx Nigeria"
        path="/services/cloud-solutions-it-infrastructure"
        location={`${siteUrl}/services/cloud-solutions-it-infrastructure`}
      />

      <CloudSolutionsHero />
      <CloudSolutionChallenge />
      <CloudInfrastructureApproach />
      <CloudServices />
      <WhoNeedsCloudSolutions />
      <WhyChooseOmoolaEx />
      <HowWeWork />
      <TechnologiesSection />
      <CloudSolutionsCTA />
    </>
  );
}
