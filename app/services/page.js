'use client';

import Head from 'next/head';
import { useEffect } from 'react';
import PageHero from '@/components/PageHero';
import ServicesCTA from '@/components/Services/ServicesCTA';
import ServicesGrid from '@/components/Services/ServicesGrid';
import WhyChooseUs from '@/components/Services/WhyChooseUs';

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Our Services | OmoolaEx",
  "url": "https://omoolaex.com.ng/services",
  "description": "Explore our web development, branding, and IT consulting services tailored to your business goals. OmoolaEx helps startups and SMEs grow online.",
  "publisher": {
    "@type": "Organization",
    "name": "OmoolaEx",
    "url": "https://omoolaex.com.ng",
    "logo": {
      "@type": "ImageObject",
      "url": "https://omoolaex.com.ng/images/omoolaex.jpg"
    }
  },
  "mainEntity": [
    {
      "@type": "Service",
      "name": "Web Design & Development",
      "description": "Responsive websites built with performance, SEO, and user experience in mind.",
      "areaServed": "Nigeria",
      "provider": {
        "@type": "Organization",
        "name": "OmoolaEx"
      }
    },
    {
      "@type": "Service",
      "name": "Brand Design & Strategy",
      "description": "Memorable brand identities crafted for startups and SMEs using modern tools.",
      "areaServed": "Nigeria",
      "provider": {
        "@type": "Organization",
        "name": "OmoolaEx"
      }
    },
    {
      "@type": "Service",
      "name": "IT Consulting & Digital Solutions",
      "description": "Tailored IT services including cybersecurity, software development, and digital marketing.",
      "areaServed": "Nigeria",
      "provider": {
        "@type": "Organization",
        "name": "OmoolaEx"
      }
    }
  ]
};

export default function Services() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: '/services',
        page_title: 'Our Services | OmoolaEx',
        page_location: 'https://omoolaex.com.ng/services',
      });
    }
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </Head>

      <main>
        <PageHero />
        <ServicesGrid />
        <WhyChooseUs />
        <ServicesCTA />
      </main>
    </>
  );
}