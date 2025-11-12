import Script from "next/script";
import PageHero from "@/components/PageHero";
import PortfolioCTA from "@/components/Portfolio/PortfolioCTA";
import PortfolioContainer from "@/components/Portfolio/PortfolioContainer";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import { client } from "@/sanity/client";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

// ✅ Updated SEO Metadata (aligned with OmoolaEx IT Consulting brand)
export const metadata = {
  title: "Portfolio | OmoolaEx IT Consultancy Ltd | Digital Transformation & Technology Solutions",
  description:
    "Explore OmoolaEx IT Consultancy Ltd portfolio — a showcase of enterprise IT projects, digital transformation initiatives, web and mobile solutions delivered for leading Nigerian businesses.",
  keywords: [
    "OmoolaEx IT Consultancy Ltd",
    "IT consulting projects Nigeria",
    "digital transformation case studies",
    "enterprise software solutions",
    "web development Nigeria",
    "mobile app development Nigeria",
    "technology portfolio OmoolaEx",
  ],
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: "OmoolaEx IT Consultancy Ltd | Our Project Portfolio",
    description:
      "Discover OmoolaEx’s successful IT projects and digital transformation solutions for businesses across Nigeria — from web development to enterprise system integration.",
    url: `${siteUrl}/portfolio`,
    siteName: "OmoolaEx IT Consultancy Ltd",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy Project Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@omoolaex",
    title: "OmoolaEx Portfolio | Digital Transformation & IT Projects",
    description:
      "Explore OmoolaEx’s technology portfolio — a collection of IT consulting, web, and cloud transformation projects shaping Africa’s digital future.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

// ✅ Enhanced Structured Data (Schema.org)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OmoolaEx IT Consultancy Ltd Portfolio",
  description:
    "A showcase of enterprise IT projects, web applications, and digital transformation initiatives by OmoolaEx IT Consultancy Ltd across Nigeria and Africa.",
  url: `${siteUrl}/portfolio`,
  publisher: {
    "@type": "Organization",
    name: "OmoolaEx IT Consultancy Ltd",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${siteUrl}/portfolio` },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "CreativeWork",
        name: "Digital Transformation Projects",
        description:
          "Technology-driven initiatives helping businesses modernize operations through OmoolaEx’s IT consulting expertise.",
      },
      {
        "@type": "CreativeWork",
        name: "Web & Mobile Solutions",
        description:
          "Full-stack web and mobile applications built for startups and enterprises in Nigeria.",
      },
      {
        "@type": "CreativeWork",
        name: "Enterprise Systems & Cloud Integration",
        description:
          "Cloud infrastructure and enterprise software deployments that power efficiency and growth.",
      },
    ],
  },
};

// ✅ Server-side data fetch
async function getPortfolioData() {
  const projects = await client.fetch(
    `*[_type == "portfolio"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      "featuredImage": featuredImage.asset->url,
      projectOverview,
      category->{ _id, title, "slug": slug.current },
      projectSnapshots[]{ asset->{url} },
      keyFeatures,
      challenges,
      ourSolution,
      impactResults,
      techStack,
      liveWebsite
    }`,
    {},
    { next: { revalidate: 60 } }
  );

  const categories = await client.fetch(
    `*[_type == "portfolioCategory"] | order(title asc){
      _id,
      title,
      "slug": slug.current
    }`,
    {},
    { next: { revalidate: 60 } }
  );

  return { projects, categories };
}

// ✅ Page component
export default async function PortfolioPage() {
  const { projects, categories } = await getPortfolioData();

  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data for Google Indexing */}
      <Script
        id="structured-data-portfolio"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Pageview Tracking for Analytics */}
      <PageViewTracker
        title="OmoolaEx IT Consultancy Portfolio"
        path="/portfolio"
        location={`${siteUrl}/portfolio`}
      />
      <PageHero
        title="Our Project Portfolio"
        subtitle="Explore how OmoolaEx helps organizations transform through technology — delivering innovative, data-driven, and scalable digital solutions."
      />
      {/* ✅ Portfolio Projects */}
      <PortfolioContainer projects={projects} categories={categories} />
      <PortfolioCTA />
    </main>
  );
}
