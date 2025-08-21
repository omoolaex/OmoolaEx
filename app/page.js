import Head from "next/head";
import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";

import Services from "../components/Home/Services";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Portfolio from "../components/Home/Portfolio";
import Testimonials from "../components/Home/Testimonials";
import OurProcess from "../components/Home/OurProcess";
import OurTechnologies from "../components/Home/OurTechnologies";
import CTASection from "../components/Home/CTA";
import NewsSection from "@/components/Home/news";
import PageViewTracker from '@/components/Analytics/PageViewTracker';

const siteUrl = "https://omoolaex.com.ng";
const siteName = "OmoolaEx";
const siteDescription =
  "OmoolaEx is a creative IT consulting company in Nigeria offering web design, branding, cybersecurity, and digital strategy services to help businesses grow online.";
const siteImage = "https://omoolaex.com.ng/images/og-image.png";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteName,
  "url": siteUrl,
  "logo": "https://omoolaex.com.ng/images/logo.svg",
  "sameAs": [
    "https://www.facebook.com/OmoolaEx",
    "https://www.instagram.com/omoolaex_",
    "https://twitter.com/omoolaex",
    "https://www.youtube.com/@omoolaex",
    "https://www.tiktok.com/@omoolaex",
    "https://www.linkedin.com/company/omoolaex-it-consulting-company"
  ],
  "description": siteDescription,
  "founder": {
    "@type": "Person",
    "name": "Owolabi Gbolahan"
  }
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// ✅ Make Home an async Server Component
export default async function Home() {
  const latestPosts = await client.fetch(latestPostsQuery);

  return (
    <main>
      <Head>
        {/* Meta Title & Description */}
        <title>OmoolaEx | IT Consulting, Web Design & Branding in Nigeria</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="IT consulting, web design Nigeria, branding, cybersecurity, digital marketing, OmoolaEx" />

        {/* Canonical */}
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${siteName} | IT Consulting & Web Design`} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteName} | IT Consulting & Web Design`} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, websiteStructuredData])
          }}
        />
      </Head>

      {/* Analytics - pageview tracking */}
      <PageViewTracker
        title="OmoolaEx | IT Consulting, Web Design & Branding in Nigeria"
        path="/"
        location={siteUrl}
      />

      {/* Page Sections */}
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <OurProcess />
      <OurTechnologies />
      <NewsSection posts={latestPosts} />
      <CTASection />
    </main>
  );
}
