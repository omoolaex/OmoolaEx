// app/services/page.js

import Script from "next/script";
import PageHero from "@/components/PageHero";
import ServicesCTA from "@/components/Services/ServicesCTA";
import ServicesGrid from "@/components/Services/ServicesGrid";
import WhyChooseUs from "@/components/Services/WhyChooseUs";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export const metadata = {
  title:
    "Our Services | OmoolaEx | Web Development, IT Consulting & Branding Experts in Lagos, Nigeria",
  description:
    "OmoolaEx offers web development, branding, IT consulting, and digital solutions for startups and SMEs in Nigeria. Grow your business online with our expert services.",
  keywords: [
    "Web Development Lagos",
    "IT Consulting Nigeria",
    "Brand Design Lagos",
    "Digital Agency Nigeria",
    "Cybersecurity",
    "Software Development",
    "Mobile App Development",
    "IT Outsourcing",
    "IT Training",
  ],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Our Services | OmoolaEx",
    description:
      "Explore OmoolaEx services including web development, branding, IT consulting, and digital solutions to help startups and SMEs grow online.",
    url: `${siteUrl}/services`,
    siteName: "OmoolaEx",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/omoolaex.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Services Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx Services",
    description:
      "Empowering startups and SMEs through innovative web development, branding, and IT consulting services.",
    images: [`${siteUrl}/images/omoolaex.jpg`],
    site: "@omoolaex",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Our Services | OmoolaEx",
  url: `${siteUrl}/services`,
  description:
    "OmoolaEx provides web development, branding, and IT consulting services tailored for startups and SMEs in Nigeria.",
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/omoolaex.jpg`,
    },
  },
  mainEntity: [
    {
      "@type": "Service",
      name: "Web Design & Development",
      description:
        "Responsive websites built for performance, SEO, and user experience.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx" },
    },
    {
      "@type": "Service",
      name: "Brand Design & Strategy",
      description:
        "Unique brand identities created for startups and SMEs using modern design tools.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx" },
    },
    {
      "@type": "Service",
      name: "IT Consulting & Digital Solutions",
      description:
        "Custom IT services including cybersecurity, software development, and digital marketing.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx" },
    },
  ],
};

export default function Services() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OmoolaEx",
            url: siteUrl,
            logo: `${siteUrl}/images/omoolaex.jpg`,
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
          }),
        }}
      />

      {/* ✅ Track Pageviews */}
      <PageViewTracker
        title="OmoolaEx Services | Web Development, IT Consulting & Branding"
        path="/services"
        location={`${siteUrl}/services`}
      />

      {/* Page Content */}
      <PageHero
        title="Our Services"
        subtitle="Innovative web development, branding, and IT consulting services for startups and SMEs."
      />
      <ServicesGrid />
      <WhyChooseUs />
      <ServicesCTA />
    </main>
  );
}
