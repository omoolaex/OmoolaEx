// app/terms/page.js
import Script from "next/script";
import TermsContent from "@/components/TermsOfService/TermsContent";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export const metadata = {
  title: "Terms & Conditions | OmoolaEx | Web Development & IT Services Nigeria",
  description:
    "Read OmoolaEx Terms & Conditions. Learn about our IT consulting, web development, branding services, and legal usage policies.",
  keywords: [
    "OmoolaEx terms",
    "Web development terms Nigeria",
    "IT consulting legal",
    "Branding services terms",
    "Digital agency policies",
  ],
  alternates: { canonical: `${siteUrl}/terms` },
  openGraph: {
    title: "Terms & Conditions | OmoolaEx",
    description:
      "View the legal terms governing OmoolaEx's web development, IT consulting, and branding services in Nigeria.",
    url: `${siteUrl}/terms`,
    siteName: "OmoolaEx",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | OmoolaEx",
    description:
      "Learn about OmoolaEx's policies, service terms, and user responsibilities for web development and IT services.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "OmoolaEx Terms & Conditions",
  url: `${siteUrl}/terms`,
  legalName: "OmoolaEx",
  areaServed: "Nigeria",
  serviceType: ["Web Development", "IT Consulting", "Branding Services"],
  provider: {
    "@type": "Organization",
    name: "OmoolaEx",
    url: siteUrl,
    logo: `${siteUrl}/images/og-image.png`,
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
      contactType: "Customer Support",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  },
};

// Optional FAQ structured data for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I contact OmoolaEx regarding terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `You can reach us via <a href="mailto:hello@omoolaex.com">hello@omoolaex.com</a> for any questions related to our terms and services.`,
      },
    },
    {
      "@type": "Question",
      name: "Do these terms apply to all OmoolaEx services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes, the terms cover all OmoolaEx offerings including <a href="/services/web-development">web development</a>, <a href="/services/branding">brand design</a>, and IT consulting.`,
      },
    },
  ],
};

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-terms"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ FAQ Schema */}
      <Script
        id="structured-data-faq-terms"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ PageViewTracker */}
      <PageViewTracker
        title="Terms & Conditions | OmoolaEx"
        path="/terms"
        location={`${siteUrl}/terms`}
      />

      {/* Page Content */}
      <TermsContent />
    </main>
  );
}
