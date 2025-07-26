'use client';

import { useEffect } from 'react';
import Head from 'next/head';

import PageHero from '@/components/PageHero';
import ContactFormMap from '@/components/Contact/ContactFormMap';
import ContactInfo from '@/components/Contact/ContactInfo';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact OmoolaEx",
  "description": "Get in touch with OmoolaEx for web development, branding, and IT consulting services in Nigeria.",
  "url": "https://omoolaex.com.ng/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "OmoolaEx",
    "url": "https://omoolaex.com.ng",
    "logo": "https://omoolaex.com.ng/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2347089217123",
      "contactType": "Customer Support",
      "areaServed": "NG",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/OmoolaEx",
      "https://www.instagram.com/omoolaex_",
      "https://twitter.com/omoolaex",
      "https://www.youtube.com/@omoolaex",
      "https://www.tiktok.com/@omoolaex",
      "https://www.linkedin.com/company/omoolaex-it-consulting-company"
    ]
  }
};

export default function Contact() {
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_title: 'Contact Us | OmoolaEx',
      page_location: 'https://omoolaex.com.ng/contact',
      page_path: '/contact',
    });
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>
        <PageHero />
        <ContactInfo />
        <ContactFormMap />
      </main>
    </>
  );
}