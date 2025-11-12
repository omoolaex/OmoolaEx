// app/services/page.js

import Script from "next/script";
import PageHero from "@/components/PageHero";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesOverview from "@/components/Services/ServicesOverview";
import ServicesCTA from "@/components/Services/ServicesCTA";
import ServicesGrid from "@/components/Services/ServicesGrid";
import WhyChooseUs from "@/components/Services/WhyChooseUs";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import WhoWeServe from "@/components/Services/WhoWeServe";

/* -------------------------------------------------------
   ✅ SITE CONFIG
------------------------------------------------------- */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

/* -------------------------------------------------------
   ✅ METADATA — Brand-aligned SEO
------------------------------------------------------- */
export const metadata = {
  title:
    "Our Services | OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria",
  description:
    "OmoolaEx IT Consultancy provides IT consulting, cloud solutions, cybersecurity, and digital transformation services for startups, SMEs, and enterprises across Nigeria.",
  keywords: [
    "IT Consulting Nigeria",
    "Digital Transformation Lagos",
    "Cloud Solutions Nigeria",
    "Managed IT Services Lagos",
    "Cybersecurity Consulting",
    "Systems Integration",
    "Technology Advisory",
    "Business Process Automation",
    "IT Infrastructure Nigeria",
  ],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title:
      "Our Services | OmoolaEx IT Consultancy | Thinking Differently | Nigeria",
    description:
      "Explore OmoolaEx IT Consultancy services — IT strategy, cloud infrastructure, cybersecurity, and digital transformation solutions tailored for African businesses.",
    url: `${siteUrl}/services`,
    siteName: "OmoolaEx IT Consultancy",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy Services Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OmoolaEx IT Consultancy | Thinking Differently | Our IT Consulting Services",
    description:
      "Discover OmoolaEx’s full range of IT consulting, digital transformation, and cloud infrastructure services in Nigeria.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

/* -------------------------------------------------------
   ✅ STRUCTURED DATA
------------------------------------------------------- */
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Our Services | OmoolaEx IT Consultancy",
  url: `${siteUrl}/services`,
  description:
    "OmoolaEx IT Consultancy offers IT consulting, cloud infrastructure, cybersecurity, and digital transformation services for startups, SMEs, and enterprises across Nigeria.",
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.svg`,
    },
  },
  mainEntity: [
    {
      "@type": "Service",
      name: "IT Consulting & Advisory",
      description:
        "Strategic technology advisory helping businesses plan, optimize, and scale IT systems with measurable outcomes.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx IT Consultancy Ltd" },
    },
    {
      "@type": "Service",
      name: "Cloud Solutions & Infrastructure",
      description:
        "Comprehensive cloud deployment, migration, and IT infrastructure management for secure, scalable operations.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx IT Consultancy Ltd" },
    },
    {
      "@type": "Service",
      name: "Cybersecurity & Risk Management",
      description:
        "Security audits, incident response, and compliance strategies to protect business assets and data integrity.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx IT Consultancy Ltd" },
    },
    {
      "@type": "Service",
      name: "Digital Transformation & Automation",
      description:
        "End-to-end transformation solutions that streamline workflows and modernize business processes through automation.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx IT Consultancy Ltd" },
    },
    {
      "@type": "Service",
      name: "Managed IT Services & Capacity Building",
      description:
        "Ongoing IT management, monitoring, and employee training programs to ensure consistent technical excellence.",
      areaServed: "Nigeria",
      provider: { "@type": "Organization", name: "OmoolaEx IT Consultancy Ltd" },
    },
  ],
};

/* -------------------------------------------------------
   ✅ COMPONENT
------------------------------------------------------- */
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
            name: "OmoolaEx IT Consultancy Ltd",
            legalName: "OmoolaEx IT Consultancy Ltd",
            url: siteUrl,
            logo: `${siteUrl}/images/logo.svg`,
            slogan: "Thinking Differently",
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
              contactType: "Customer Service",
              areaServed: "NG",
              availableLanguage: ["English"],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi",
              addressLocality: "Ikeja",
              addressRegion: "Lagos",
              postalCode: "100271",
              addressCountry: "NG",
            },
          }),
        }}
      />

      {/* ✅ Analytics: Track Page Views */}
      <PageViewTracker
        title="OmoolaEx IT Consultancy | Thinking Differently | Our Services"
        path="/services"
        location={`${siteUrl}/services`}
      />

      {/* ✅ Page Content */}
      <PageHero
        title="Our Services"
        subtitle="Tailored IT consulting, digital transformation, and cloud solutions designed for businesses across Africa."
      />
      <ServicesHero />
      <ServicesOverview />
      <ServicesGrid />
      <WhyChooseUs />
      <WhoWeServe />
      <ServicesCTA />
    </main>
  );
}
