// app/request-quote/page.js

import Script from "next/script";
import PageHero from "@/components/PageHero";
import { Suspense } from "react";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export const metadata = {
  title: "Request a Free Quote | OmoolaEx | Web Development, Branding & IT Consulting",
  description:
    "Request a free quote from OmoolaEx for web development, IT consulting, branding, or digital solutions. Get a custom proposal tailored to your project needs.",
  keywords: [
    "OmoolaEx request quote",
    "Web development quote Nigeria",
    "IT consulting quote Lagos",
    "Branding project quote",
    "Digital agency quote Nigeria",
    "Website design quote",
  ],
  alternates: { canonical: `${siteUrl}/request-quote` },
  openGraph: {
    title: "Request a Free Quote | OmoolaEx",
    description:
      "Get a personalized project quote for web development, IT consulting, or branding with OmoolaEx.",
    url: `${siteUrl}/request-quote`,
    siteName: "OmoolaEx",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/omoolaex.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Request a Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Free Quote | OmoolaEx",
    description:
      "Submit your project requirements and receive a tailored quote from OmoolaEx for web, branding, or IT consulting.",
    images: [`${siteUrl}/images/omoolaex.jpg`],
    site: "@omoolaex",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Request a Free Quote | OmoolaEx",
  url: `${siteUrl}/request-quote`,
  description:
    "Submit your project requirements to OmoolaEx and receive a tailored quote for web development, IT consulting, or branding services.",
  mainEntity: {
    "@type": "Service",
    name: "Project Quote Request",
    description:
      "OmoolaEx provides web development, IT consulting, branding, and digital solutions. Submit your project details to receive a personalized quote.",
    provider: {
      "@type": "Organization",
      name: "OmoolaEx",
      url: siteUrl,
    },
    areaServed: "Nigeria",
  },
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
};

export default function RequestQuote() {
  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data */}
      <Script
        id="structured-data-request-quote"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Track Pageviews */}
      <PageViewTracker
        title="Request a Free Quote | OmoolaEx"
        path="/request-quote"
        location={`${siteUrl}/request-quote`}
      />

      {/* Page Content */}
      <PageHero
        title="Request a Free Quote"
        subtitle="Let’s bring your digital vision to life. Tell us what you need, and we’ll handle the rest."
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Suspense>
          <RequestQuoteForm />
        </Suspense>
      </div>
    </main>
  );
}
