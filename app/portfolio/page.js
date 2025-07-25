'use client';

import { useEffect } from 'react';
import Head from 'next/head';

import PageHero from '@/components/PageHero';
import PortfolioCTA from '@/components/Portfolio/PortfolioCTA';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';

export const metadata = {
  title: 'Our Portfolio | OmoolaEx | Our Projects Showcase',
  description:
    'Explore our portfolio of successful web development, branding, and IT consulting projects. OmoolaEx helps businesses grow through custom digital solutions.',
  keywords: [
    'OmoolaEx Portfolio',
    'Web Design Projects Nigeria',
    'Branding Showcase Lagos',
    'Web Development Portfolio',
    'IT Consulting Case Studies',
    'Custom Web Projects',
    'Business Website Examples',
    'Digital Solutions Nigeria',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/portfolio',
  },
  openGraph: {
    title: 'OmoolaEx Project Portfolio',
    description:
      'See real results from our web, branding, and IT services. We deliver digital solutions for startups and growing businesses in Nigeria.',
    url: 'https://omoolaex.com.ng/portfolio',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Portfolio Projects',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmoolaEx Portfolio',
    description:
      'Discover our digital transformation work across Nigeria. Web, branding, and IT results.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

// Structured data (schema.org)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Portfolio | OmoolaEx",
  "description": "Explore our portfolio of web development, branding, and IT consulting projects.",
  "url": "https://omoolaex.com.ng/portfolio",
  "mainEntity": [
    {
      "@type": "CreativeWork",
      "name": "Creams'n'Bakers Website",
      "description": "E-commerce website with WhatsApp integration for a bakery in Nigeria.",
      "url": "https://omoolaex.com.ng/portfolio/creamsnbakers",
      "image": "https://omoolaex.com.ng/images/projects/creamsnbakers.jpg"
    },
    {
      "@type": "CreativeWork",
      "name": "Markethub9ja Platform",
      "description": "Multi-vendor marketplace for Nigerian sellers built with React and WooCommerce.",
      "url": "https://omoolaex.com.ng/portfolio/markethub9ja",
      "image": "https://omoolaex.com.ng/images/projects/markethub9ja.jpg"
    }
    // Add more as needed
  ]
};

export default function Portfolio() {
  useEffect(() => {
    // Google Analytics page_view event
    window.gtag?.('event', 'page_view', {
      page_title: 'Our Portfolio | OmoolaEx',
      page_location: 'https://omoolaex.com.ng/portfolio',
      page_path: '/portfolio',
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
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
    </>
  );
}