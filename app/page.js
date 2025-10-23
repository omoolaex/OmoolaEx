import Head from "next/head";
import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";

import Services from "../components/Home/Services";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Portfolio from "../components/Home/Portfolio";
import WhyChoose from "../components/Home/WhyChoose";
import Testimonials from "../components/Home/Testimonials";
import OurProcess from "../components/Home/OurProcess";
import CTASection from "../components/Home/CTA";
import NewsSection from "@/components/Home/news";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

/* ---------------------------------------------
   ✅ SITE META CONFIG
--------------------------------------------- */
const siteUrl = "https://omoolaex.com.ng";
const siteName = "OmoolaEx IT Consultancy";
const siteImage = "https://omoolaex.com.ng/images/omoolaex.jpg";
const siteDescription =
  "OmoolaEx IT Consultancy helps Nigerian businesses navigate digital transformation with clarity and confidence. We deliver IT strategy, cloud infrastructure, cybersecurity, and scalable systems built on trust, innovation, and measurable results.";

/* ---------------------------------------------
   ✅ STRUCTURED DATA
--------------------------------------------- */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: "https://omoolaex.com.ng/images/logo.svg",
  sameAs: [
    "https://www.facebook.com/OmoolaEx",
    "https://www.instagram.com/omoolaex_",
    "https://twitter.com/omoolaex",
    "https://www.youtube.com/@omoolaex",
    "https://www.tiktok.com/@omoolaex",
    "https://www.linkedin.com/company/omoolaex-it-consulting-company",
  ],
  description: siteDescription,
  slogan: "Thinking Differently",
  founder: { "@type": "Person", name: "Owolabi Gbolahan" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "OmoolaEx IT Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IT Consulting & Advisory",
          description:
            "Strategic IT guidance, technology cost optimization, and transformation roadmaps for Nigerian businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Solutions & IT Infrastructure",
          description:
            "Cloud migration, infrastructure design, and scalable deployment to optimize business performance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Transformation Consulting",
          description:
            "Enterprise technology modernization, process automation, and system integration for competitive growth.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Managed IT Services",
          description:
            "Ongoing IT support, system monitoring, and performance management for operational continuity.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersecurity & Capacity Building",
          description:
            "Security audits, training, and data protection solutions for businesses across Nigeria.",
        },
      },
    ],
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/* ---------------------------------------------
   ✅ HOME PAGE
--------------------------------------------- */
export default async function Home() {
  const latestPosts = await client.fetch(latestPostsQuery);

  return (
    <main>
      <Head>
        {/* Primary Meta */}
        <title>
          OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria
        </title>
        <meta name="description" content={siteDescription} />
        <meta
          name="keywords"
          content="IT Consulting Nigeria, Digital Transformation, Cloud Infrastructure, Cybersecurity, Systems Integration, OmoolaEx IT Consultancy, Managed IT Services"
        />

        {/* Canonical */}
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="OmoolaEx IT Consultancy | Thinking Differently"
        />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="OmoolaEx IT Consultancy | Thinking Differently"
        />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, websiteStructuredData]),
          }}
        />
      </Head>

      {/* Page View Tracking */}
      <PageViewTracker
        title="OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria"
        path="/"
        location={siteUrl}
      />

      {/* ---------------------------------------------
          Page Sections — modular + semantic
      --------------------------------------------- */}
      {/* Hero: headline and CTA */}
      <Hero />

      {/* About: who we are */}
      <About />

      {/* Services: core offerings */}
      <Services />

      {/* Portfolio: case studies */}
      <Portfolio />

      {/* Trust Building: reasons */}
      <WhyChoose />

      {/* Testimonials: client feedback */}
      <Testimonials />

      {/* Our Process: delivery steps */}
      <OurProcess />

      {/* News & Insights */}
      <NewsSection posts={latestPosts} />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
