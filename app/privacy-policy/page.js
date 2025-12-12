// app/privacy/page.js
import Script from "next/script";
import PrivacyContent from "@/components/Privacy/PrivacyContent";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ Updated SEO metadata (aligned with OmoolaEx IT Consultancy focus)
export const metadata = {
  title: "Privacy Policy | OmoolaEx IT Consultancy Ltd | Data Protection & Transparency",
  description:
    "Read OmoolaEx IT Consultancy Ltd’s Privacy Policy to understand how we collect, use, and protect your data in line with global data protection standards.",
  keywords: [
    "OmoolaEx IT Consultancy Ltd",
    "data protection Nigeria",
    "privacy policy IT consulting",
    "digital transformation data privacy",
    "information security Nigeria",
    "tech company privacy compliance",
  ],
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | OmoolaEx IT Consultancy Ltd",
    description:
      "OmoolaEx IT Consultancy Ltd is committed to protecting your data privacy and ensuring transparency across all our digital and consulting operations.",
    url: `${siteUrl}/privacy-policy`,
    siteName: "OmoolaEx IT Consultancy Ltd",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@omoolaex",
    title: "Privacy Policy | OmoolaEx IT Consultancy Ltd",
    description:
      "Learn about OmoolaEx IT Consultancy Ltd’s approach to data privacy, transparency, and user protection across our digital solutions.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

// ✅ Enhanced structured data for better indexing
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy | OmoolaEx IT Consultancy Ltd",
  url: `${siteUrl}/privacy-policy`,
  description:
    "OmoolaEx IT Consultancy Ltd’s official privacy policy explaining how we collect, store, and protect your information in compliance with Nigerian and global data protection laws.",
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
  mainEntity: {
    "@type": "CreativeWork",
    name: "Privacy Policy",
    about: [
      "Data Collection Practices",
      "User Consent and Transparency",
      "Data Storage and Security",
      "Third-party Tools and Cookies",
      "GDPR & NDPR Compliance",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${siteUrl}/privacy-policy`,
      },
    ],
  },
};

// ✅ Page Component
export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data for Google Indexing */}
      <Script
        id="structured-data-privacy-policy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pageview Tracking */}
      <PageViewTracker
        title="Privacy Policy | OmoolaEx IT Consultancy Ltd"
        path="/privacy-policy"
        location={`${siteUrl}/privacy-policy`}
      />

      {/* Content */}
      <PrivacyContent />
    </main>
  );
}
