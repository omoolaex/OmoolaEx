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

export const metadata = {
  title:
    "Web Design & Development Services | OmoolaEx | Lagos, Nigeria",
  description:
    "OmoolaEx provides professional web design and development services in Lagos, Nigeria. We build responsive, SEO-optimized, and conversion-focused websites for startups and SMEs.",
  keywords: [
    "Web Design Lagos",
    "Web Development Nigeria",
    "Responsive Websites",
    "SEO Web Design",
    "UI UX Design Lagos",
    "Custom Website Development",
    "Business Websites Nigeria",
    "Ecommerce Web Development",
    "OmoolaEx Web Design",
  ],
  alternates: {
    canonical: `${siteUrl}/services/web-design`,
  },
  openGraph: {
    title: "Web Design & Development Services | OmoolaEx",
    description:
      "Get responsive, SEO-friendly, and conversion-focused web development services from OmoolaEx in Lagos, Nigeria.",
    url: `${siteUrl}/services/web-design`,
    siteName: "OmoolaEx",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Web Design & Development Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | Web Design & Development Services in Lagos",
    description:
      "Build a responsive, fast, and SEO-optimized website with OmoolaEx. Serving startups and SMEs in Nigeria.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

// ✅ Structured Data for Service with Ratings & Reviews
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
    logo: `${siteUrl}/images/og-image.png`,
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
  url: `${siteUrl}/services/web-design`,

  // ⭐ Aggregate Rating
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "125",
  },

  // ⭐ Example Reviews (Optional but powerful)
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Chinedu A." },
      datePublished: "2024-11-12",
      reviewBody:
        "OmoolaEx transformed our outdated website into a modern, responsive, and SEO-optimized platform. We saw a boost in customer inquiries within weeks!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Fatima O." },
      datePublished: "2024-12-05",
      reviewBody:
        "Excellent web development service! The team at OmoolaEx was professional, fast, and delivered a stunning website for our startup.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  ],
};

// ✅ FAQ Schema
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
        id="structured-data-web-design"
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
        path="/services/web-design"
        location={`${siteUrl}/services/web-design`}
      />

      {/* Hero Section */}
      <PageHero
        title="Web Design & Development"
        subtitle={
          <>
            Creating responsive, SEO-friendly websites that convert visitors into customers. Check our{" "}
            <Link href="/services/branding" className="underline text-blue-600">
              Brand Design Services
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/top-web-design-trends-2025"
              className="underline text-blue-600"
            >
              latest Web Design trends
            </Link>{" "}
            for more insights.
          </>
        }
      />

      {/* Service Sections */}
      <ServiceOverview />
      <WhyWebDesignMatters />
      <OurApproach />
      <PricingAndBenefits />
      <WebDesignCTA />
    </main>
  );
}
