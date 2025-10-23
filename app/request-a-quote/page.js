// app/request-a-quote/page.js
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

// ✅ SEO metadata aligned with OmoolaEx IT Consultancy brand
export const metadata = {
  title:
    "Request a Free Project Quote | OmoolaEx IT Consultancy Ltd | Web, Cloud & Digital Solutions",
  description:
    "Get a tailored project quote from OmoolaEx IT Consultancy Ltd for web development, cloud solutions, IT consulting, or branding. Let’s build something exceptional together.",
  keywords: [
    "OmoolaEx IT Consultancy Ltd",
    "web development quote Nigeria",
    "IT consulting quote Lagos",
    "cloud infrastructure pricing",
    "software development estimate",
    "digital transformation proposal",
    "website redesign cost",
  ],
  alternates: { canonical: `${siteUrl}/request-a-quote` },
  openGraph: {
    title: "Request a Project Quote | OmoolaEx IT Consultancy Ltd",
    description:
      "Submit your project details and receive a custom quote from OmoolaEx IT Consultancy Ltd — experts in IT strategy, cloud solutions, and digital innovation.",
    url: `${siteUrl}/request-a-quote`,
    siteName: "OmoolaEx IT Consultancy Ltd",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/logo.svg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Request a Project Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@omoolaex",
    title: "Request a Project Quote | OmoolaEx IT Consultancy Ltd",
    description:
      "Tell us about your web, IT, or digital project and get a custom quote from OmoolaEx IT Consultancy Ltd.",
    images: [`${siteUrl}/images/logo.svg`],
  },
};

// ✅ Updated structured data for rich results
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Request a Free Project Quote | OmoolaEx IT Consultancy Ltd",
  url: `${siteUrl}/request-a-quote`,
  description:
    "Submit your project requirements to OmoolaEx IT Consultancy Ltd and get a tailored quote for IT consulting, cloud solutions, software development, or branding.",
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
  },
  mainEntity: {
    "@type": "Service",
    name: "Custom IT & Digital Project Quotation",
    description:
      "OmoolaEx provides customized proposals for IT consulting, digital transformation, cloud deployment, and web development projects.",
    serviceType: [
      "IT Consulting",
      "Cloud Infrastructure Solutions",
      "Web and App Development",
      "Digital Transformation",
      "Brand Strategy and Design",
    ],
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    provider: {
      "@type": "Organization",
      name: "OmoolaEx IT Consultancy Ltd",
      url: siteUrl,
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Request a Quote",
        item: `${siteUrl}/request-a-quote`,
      },
    ],
  },
};

export default function RequestQuote() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data for Google Indexing */}
      <Script
        id="structured-data-request-a-quote"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Analytics Page View Tracking */}
      <PageViewTracker
        title="Request a Project Quote | OmoolaEx IT Consultancy Ltd"
        path="/request-a-quote"
        location={`${siteUrl}/request-a-quote`}
      />

      {/* ✅ Page Hero Section */}
      <PageHero
        title="Request a Project Quote"
        subtitle="Tell us about your project goals — our experts will craft a personalized solution plan and pricing estimate tailored to your business needs."
      />

      {/* ✅ Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Suspense>
          <RequestQuoteForm />
        </Suspense>
      </div>
    </main>
  );
}
