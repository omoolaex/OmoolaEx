'use client';

import { useEffect } from 'react';
import Head from 'next/head';

import PageHero from '@/components/PageHero';
import CareersHero from '@/components/Careers/CareersHero';
import WhyWorkOmoolaEx from '@/components/Careers/WhyWorkOmoolaEx';
import Careers from '@/components/Careers/Careers';
import PerksAndBenefits from '@/components/Careers/PerksAndBenefits';
import HowWeWork from '@/components/Careers/HowWeWork';
import CareersForm from '@/components/Careers/CareersForm';

export const metadata = {
  title: 'Careers Opportunities at OmoolaEx | Join Our Innovative Team',
  description:
    'Explore job opportunities and grow your career at OmoolaEx. We’re always looking for talented, driven people to help shape the future of IT solutions.',
  keywords: [
    'OmoolaEx Careers',
    'Work at OmoolaEx',
    'Tech Jobs Nigeria',
    'Creative Agency Hiring',
    'Join OmoolaEx Team',
    'IT Job Vacancies',
    'Career Opportunities Lagos',
    'Remote Tech Jobs Nigeria'
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/careers',
  },
  openGraph: {
    title: 'Careers at OmoolaEx | Build Your Future With Us',
    description:
      'Discover opportunities to join the OmoolaEx team and do meaningful work that impacts businesses. We’re hiring!',
    url: 'https://omoolaex.com.ng/careers',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Careers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join OmoolaEx – Careers Page',
    description: 'Be part of a forward-thinking team. Apply now and grow your tech career at OmoolaEx.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

// Schema Markup
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Careers at OmoolaEx",
  "description": "Discover opportunities to join the OmoolaEx team and do meaningful work that impacts businesses.",
  "url": "https://omoolaex.com.ng/careers",
  "mainEntity": {
    "@type": "Organization",
    "name": "OmoolaEx",
    "url": "https://omoolaex.com.ng",
    "logo": "https://omoolaex.com.ng/images/logo.png",
    "sameAs": [
    "https://www.facebook.com/OmoolaEx",
    "https://www.instagram.com/omoolaex_",
    "https://twitter.com/omoolaex",
    "https://www.youtube.com/@omoolaex",
    "https://www.tiktok.com/@omoolaex",
    "https://www.linkedin.com/company/omoolaex-it-consulting-company"
    ],
    "hiringOrganization": {
      "@type": "Organization",
      "name": "OmoolaEx",
      "sameAs": "https://omoolaex.com.ng",
      "logo": "https://omoolaex.com.ng/images/logo.png"
    }
  }
};

export default function CareersPage() {
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_title: 'Careers Opportunities at OmoolaEx',
      page_location: 'https://omoolaex.com.ng/careers',
      page_path: '/careers',
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
        <CareersHero />
        <WhyWorkOmoolaEx />
        <Careers />
        <PerksAndBenefits />
        <HowWeWork />
        <CareersForm />
      </main>
    </>
  );
}