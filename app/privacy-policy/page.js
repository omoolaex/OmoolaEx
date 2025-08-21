// app/privacy/page.js

import Script from "next/script";
import PrivacyContent from "@/components/PrivacyContent";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export const metadata = {
  title: "Privacy Policy | OmoolaEx | Protecting Your Data",
  description:
    "Learn how OmoolaEx collects, uses, and safeguards your personal information. Our commitment to privacy and data protection.",
  keywords: [
    "OmoolaEx privacy policy",
    "data protection Nigeria",
    "web development privacy",
    "IT consulting privacy",
    "digital agency privacy",
  ],
  alternates: { canonical: `${siteUrl}/privacy` },
  openGraph: {
    title: "Privacy Policy | OmoolaEx",
    description:
      "Understand how OmoolaEx collects, uses, and protects your personal data and ensures your privacy.",
    url: `${siteUrl}/privacy`,
    siteName: "OmoolaEx",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/omoolaex.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | OmoolaEx",
    description:
      "Understand OmoolaEx’s commitment to protecting your data and privacy.",
    images: [`${siteUrl}/images/omoolaex.jpg`],
    site: "@omoolaex",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy | OmoolaEx",
  url: `${siteUrl}/privacy`,
  description:
    "Learn how OmoolaEx collects, uses, and safeguards your personal information. Our commitment to privacy and data protection.",
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
};

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-privacy"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Track Pageviews */}
      <PageViewTracker
        title="Privacy Policy | OmoolaEx"
        path="/privacy"
        location={`${siteUrl}/privacy`}
      />

      {/* Page Content */}
      <PrivacyContent />
    </main>
  );
}
