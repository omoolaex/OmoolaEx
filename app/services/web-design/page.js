// /app/services/web-development/page.js
import Script from "next/script";
import PageHero from "@/components/PageHero";
import ServiceOverview from "@/components/Services/WebDevelopmentService/ServiceOverview";
import WhyWebDesignMatters from "@/components/Services/WebDevelopmentService/WhyWebDesignMatters";
import OurApproach from "@/components/Services/WebDevelopmentService/OurApproach";
import PricingAndBenefits from "@/components/Services/WebDevelopmentService/PricingAndBenefits";
import WebDesignCTA from "@/components/Services/WebDevelopmentService/WebDesignCTA";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Design & Development",
  description:
    "OmoolaEx offers professional web design and development services in Nigeria, creating responsive, SEO-friendly, and conversion-focused websites for startups and SMEs.",
  provider: {
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
  },
  areaServed: "Nigeria",
  serviceType: "Web Design & Development",
  url: `${siteUrl}/services/web-development`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our typical web development timeline ranges from 2 to 6 weeks, depending on complexity and client requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer SEO-friendly websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All websites we build are SEO-optimized with fast loading speeds, mobile responsiveness, and semantic HTML structure.",
      },
    },
    {
      "@type": "Question",
      name: "Can I request a redesign of my existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We can revamp your current website to modern standards while improving SEO, performance, and user experience.",
      },
    },
  ],
};

export default function WebDevelopmentPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data for Service */}
      <Script
        id="structured-data-web-development"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ FAQ Schema */}
      <Script
        id="structured-data-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ Track Pageviews */}
      <PageViewTracker
        title="Web Design & Development Services | OmoolaEx"
        path="/services/web-development"
        location={`${siteUrl}/services/web-development`}
      />

      {/* Page Hero */}
      <PageHero
        title="Web Design & Development"
        subtitle={
          <>
            Creating responsive, SEO-friendly websites that convert visitors into customers. Check our{" "}
            <Link href="/services/branding" className="underline text-blue-600">
              Brand Design Services
            </Link>{" "}
            and{" "}
            <Link href="/blog/top-web-design-trends-2025" className="underline text-blue-600">
              latest Web Design trends
            </Link>{" "}
            for more insights.
          </>
        }
      />

      {/* Modular Sections with lazy loading for images below fold */}
      <ServiceOverview />
      <WhyWebDesignMatters />
      <OurApproach />
      <PricingAndBenefits />
      <WebDesignCTA />
    </main>
  );
}
