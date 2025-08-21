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
import PageViewTracker from '@/components/Analytics/PageViewTracker';

export const metadata = {
  title: 'About Us | OmoolaEx | Web Development & IT Consulting Experts in Lagos, Nigeria',
  description:
    'Learn about OmoolaEx, a forward-thinking IT consulting and digital agency in Lagos. We specialize in web design, branding, cybersecurity, and digital strategy for startups and SMEs.',
  keywords: [
    'About OmoolaEx',
    'OmoolaEx Team',
    'Digital Agency Lagos',
    'Web Development Experts',
    'Brand Strategy Nigeria',
    'IT Consulting Lagos',
    'UI UX Design Nigeria',
    'Startup Solutions Lagos',
    'Cybersecurity Consulting',
    'Business Growth Nigeria'
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/about',
  },
  openGraph: {
    title: 'About OmoolaEx | Web Development & IT Consulting Experts',
    description:
      'Meet OmoolaEx – a digital agency in Lagos, Nigeria helping startups and businesses with IT consulting, web development, branding, and digital solutions.',
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
    title: 'About OmoolaEx | Digital Agency in Lagos',
    description:
      'Discover the team and process behind OmoolaEx – your trusted partner in IT consulting, branding, and web development in Nigeria.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

export default function About() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ STRUCTURED DATA FOR SEO */}
      <Script
        id="structured-data-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About OmoolaEx",
            "description":
              "Learn about OmoolaEx, our mission, values, team, and the innovative IT consulting and digital services we provide to businesses in Nigeria.",
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
            "logo": "https://omoolaex.com.ng/images/logo.svg",
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
            },
            "founder": {
              "@type": "Person",
              "name": "Owolabi Gbolahan"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lagos",
              "addressCountry": "NG"
            }
          }),
        }}
      />

      {/* ✅ Analytics pageview tracking */}
      <PageViewTracker
        title="About OmoolaEx - Digital Agency in Lagos"
        path="/about"
        location="https://omoolaex.com.ng/about"
      />

      {/* ✅ Page Sections */}
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
