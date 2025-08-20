// /app/services/web-development/page.js
import Link from "next/link";
import Image from "next/image";
import PageHero from '@/components/PageHero';
import Head from 'next/head';
import ServiceOverview from "@/components/Services/WebDevelopmentService/ServiceOverview";
import WhyWebDesignMatters from "@/components/Services/WebDevelopmentService/WhyWebDesignMatters";
import OurApproach from "@/components/Services/WebDevelopmentService/OurApproach";
import PricingAndBenefits from "@/components/Services/WebDevelopmentService/PricingAndBenefits";
import WebDesignCTA from "@/components/Services/WebDevelopmentService/WebDesignCTA";

export default function WebDevelopmentPage() {
  return (
    <main className="overflow-x-hidden relative">
      <Head>
        <title>Web Design & Development Services | OmoolaEx</title>
        <meta name="description" content="Professional web design and development services in Nigeria. Responsive, SEO-friendly, and conversion-focused websites for your business." />
        <meta property="og:title" content="Web Design & Development Services | OmoolaEx" />
        <meta property="og:description" content="Professional web design and development services in Nigeria. Responsive, SEO-friendly, and conversion-focused websites for your business." />
        <meta property="og:image" content="/images/services/web-design.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omoolaex.com.ng/services/web-development" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design & Development Services | OmoolaEx" />
        <meta name="twitter:description" content="Professional web design and development services in Nigeria. Responsive, SEO-friendly, and conversion-focused websites for your business." />
        <meta name="twitter:image" content="/images/services/web-design.jpg" />
        <link rel="canonical" href="https://omoolaex.com.ng/services/web-development" />
      </Head>

      {/* Modular Sections */}
      <PageHero />
      <ServiceOverview />
      <WhyWebDesignMatters />
      <OurApproach />
      <PricingAndBenefits />
      <WebDesignCTA />
    </main>
  );
}