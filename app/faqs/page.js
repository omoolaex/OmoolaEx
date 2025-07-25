'use client';

import { useEffect } from 'react';
import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FAQs/FaqAccordion';
import FaqCTA from './FaqCTA';
import FaqStructuredData from '@/components/FAQs/FaqStructuredData';

export const generateMetadata = () => ({
  title: 'FAQs | Frequently Asked Questions | OmoolaEx',
  description:
    'Find answers to common questions about our services, process, pricing, and more. Get the clarity you need before working with OmoolaEx.',
  keywords: [
    'OmoolaEx FAQs',
    'Frequently Asked Questions',
    'Website design questions',
    'IT consulting support',
    'Pricing FAQ',
    'OmoolaEx customer support',
    'Digital agency help center',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/faqs',
  },
  openGraph: {
    title: 'FAQs | Frequently Asked Questions | OmoolaEx',
    description:
      'Got questions? Find answers to common inquiries about our process, pricing, and services.',
    url: 'https://omoolaex.com.ng/faqs',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx FAQs Page',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | OmoolaEx',
    description: 'Your top questions about OmoolaEx answered in one place.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
});

export default function FAQs() {
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_title: 'FAQs | Frequently Asked Questions | OmoolaEx',
      page_location: 'https://omoolaex.com.ng/faqs',
      page_path: '/faqs',
    });
  }, []);

  return (
    <main>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about working with OmoolaEx."
      />
      <FaqAccordion />
      <FaqCTA />
      <FaqStructuredData />
    </main>
  );
}