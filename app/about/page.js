// app/about/page.js

import Script from 'next/script';
import AboutHero from "@/components/AboutUs/Hero";
import PageHero from "../../components/PageHero";
import OurStory from "@/components/AboutUs/OurStory";
import WhyUs from "@/components/AboutUs/WhyUs";
import WhoWeServe from "@/components/AboutUs/WhoWeServe";
import OurProcess from "@/components/Home/OurProcess";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import OurTeam from "@/components/AboutUs/OurTeam";
import Gallery from "@/components/AboutUs/gallery";
import CTA from "@/components/AboutUs/cta";

export const metadata = {
  title: 'About Us | OmoolaEx | Web Development Experts & Digital Agency in Lagos, Nigeria',
  description: 'Discover OmoolaEx, a forward-thinking digital agency in Lagos offering web development, branding, and IT consulting services tailored to startups and SMEs.',
  keywords: [
    'About OmoolaEx',
    'OmoolaEx Team',
    'Digital Agency Lagos',
    'Web Development Experts',
    'Brand Strategy Nigeria',
    'Tech Company Lagos',
    'IT Consulting Nigeria',
    'UI UX Design Team',
    'Startup Solutions Lagos',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/about',
  },
  openGraph: {
    title: 'About Us | OmoolaEx',
    description: 'Get to know OmoolaEx – who we are, what we do, and how we help businesses succeed online. Meet our team and explore our process.',
    url: 'https://omoolaex.com.ng/about',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx | About Us Page',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About OmoolaEx',
    description: 'Learn about the people and process behind OmoolaEx – a digital agency for startups and SMEs.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

export default function About() {
  return (
    <main className="overflow-x-hidden relative">
      {/* 👇 STRUCTURED DATA FOR SEO */}
      <Script
        id="structured-data-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About OmoolaEx",
            "description": "Learn about OmoolaEx, our mission, values, and the team behind our digital solutions.",
            "url": "https://omoolaex.com.ng/about",
          }),
        }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OmoolaEx",
            "url": "https://omoolaex.com.ng",
            "logo": "https://omoolaex.com.ng/images/omoolaex.jpg",
            "sameAs": [
              "https://www.facebook.com/OmoolaEx",
              "https://www.instagram.com/omoolaex_",
              "https://twitter.com/omoolaex",
              "https://www.youtube.com/@omoolaex",
              "https://www.tiktok.com/@omoolaex",
              "https://www.linkedin.com/company/omoolaex-it-consulting-company"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+2347089217123",
              "contactType": "Customer Support",
              "areaServed": "NG",
              "availableLanguage": ["English"]
            }
          }),
        }}
      />

      {/* Page Sections */}
      <div className="flex flex-col overflow-x-hidden">
        <PageHero />
        <AboutHero />
        <OurStory />
        <WhyUs />
        <WhoWeServe />
        <OurProcess />
        <WhatWeDo />
        <OurTeam />
        <Gallery />
        <CTA />
      </div>
    </main>
  );
}