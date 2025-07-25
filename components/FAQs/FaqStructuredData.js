'use client';

import React from 'react';
import Head from 'next/head';

const faqData = [
  {
    question: 'What services does OmoolaEx offer?',
    answer:
      'OmoolaEx offers web development, brand design, IT consulting, software development, and digital marketing services tailored to business needs.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'Pricing varies by project scope. We provide custom quotes after understanding your needs.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes, OmoolaEx works with clients globally and provides remote service delivery and communication.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary by scope, but most standard projects take 2–6 weeks. We’ll give you a clear timeline during onboarding.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Absolutely. We specialize in website redesigns that improve user experience, performance, and branding.',
  },
];

export default function FaqStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}