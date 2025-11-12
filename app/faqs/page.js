import Script from 'next/script';
import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FAQs/FaqAccordion';
import FaqCTA from './FaqCTA';
import { faqStructuredData } from '@/components/FAQs/FaqStructuredData';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000');

export const metadata = {
  title: 'FAQs | Frequently Asked Questions | OmoolaEx',
  description:
    'Find answers to common questions about web development, IT consulting, branding, and digital solutions with OmoolaEx.',
  keywords: [
    'OmoolaEx FAQs',
    'IT consulting questions',
    'Web development FAQs',
    'Branding questions',
    'Digital agency Nigeria',
  ],
  alternates: { canonical: `${siteUrl}/faqs` },
  openGraph: {
    title: 'FAQs | OmoolaEx',
    description:
      'Find answers to common questions about working with OmoolaEx, including web development, IT consulting, and branding services.',
    url: `${siteUrl}/faqs`,
    siteName: 'OmoolaEx',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'OmoolaEx FAQs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | OmoolaEx',
    description:
      'Answers to frequently asked questions about OmoolaEx services: web development, IT consulting, and branding.',
    images: [`${siteUrl}/images/og-image.png`],
    site: '@omoolaex',
  },
};

// ✅ Server-side JSON-LD structured data
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqStructuredData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'FAQs', item: `${siteUrl}/faqs` },
    ],
  },
];

export default function FAQs() {
  return (
    <main className="overflow-x-hidden relative">
      {/* JSON-LD Structured Data */}
      <Script
        id="structured-data-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pageview Tracker */}
      <PageViewTracker
        title="FAQs | Frequently Asked Questions | OmoolaEx"
        path="/faqs"
        location={`${siteUrl}/faqs`}
      />

      {/* Page Hero */}
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about working with OmoolaEx."
      />

      {/* FAQ Accordion */}
      <FaqAccordion />

      {/* Call to Action */}
      <FaqCTA />
    </main>
  );
}
