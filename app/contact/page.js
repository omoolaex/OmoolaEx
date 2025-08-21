import Script from 'next/script';
import PageHero from '@/components/PageHero';
import ContactFormMap from '@/components/Contact/ContactFormMap';
import ContactInfo from '@/components/Contact/ContactInfo';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000');

export const metadata = {
  title: 'Contact Us | OmoolaEx | Web Development, IT Consulting & Branding',
  description:
    'Get in touch with OmoolaEx for web development, IT consulting, branding, and digital solutions. We are here to help you grow your business.',
  keywords: [
    'Contact OmoolaEx',
    'Web Development Nigeria',
    'IT Consulting Lagos',
    'Branding Company Contact',
    'Request Quote Web Design',
    'Talk to OmoolaEx',
    'Contact Digital Agency',
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact Us | OmoolaEx',
    description:
      'Reach out to OmoolaEx for professional web development, branding, and IT consulting solutions. Let’s discuss your project today.',
    url: `${siteUrl}/contact`,
    siteName: 'OmoolaEx',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/omoolaex.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact OmoolaEx',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact OmoolaEx',
    description:
      'Reach out to OmoolaEx to discuss your web development, branding, or IT consulting project.',
    images: [`${siteUrl}/images/omoolaex.jpg`],
    site: '@omoolaex',
  },
};

const structuredData = [
  // ContactPage Schema
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us - OmoolaEx',
    description:
      'Connect with OmoolaEx for expert IT consulting, web development, and digital branding services. Let’s bring your ideas to life.',
    url: `${siteUrl}/contact`,
  },
  // Organization Schema
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OmoolaEx',
    url: siteUrl,
    logo: `${siteUrl}/images/omoolaex.jpg`,
    sameAs: [
      'https://www.facebook.com/OmoolaEx',
      'https://www.instagram.com/omoolaex_',
      'https://twitter.com/omoolaex',
      'https://www.youtube.com/@omoolaex',
      'https://www.tiktok.com/@omoolaex',
      'https://www.linkedin.com/company/omoolaex-it-consulting-company',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+2347089217123',
      contactType: 'Customer Support',
      areaServed: 'NG',
      availableLanguage: ['English'],
    },
  },
  // Breadcrumb Schema
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
    ],
  },
];

export default function Contact() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ JSON-LD Structured Data */}
      <Script
        id="structured-data-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Pageview Tracker */}
      <PageViewTracker
        title="Contact Us | OmoolaEx"
        path="/contact"
        location={`${siteUrl}/contact`}
      />

      {/* Page Content */}
      <PageHero
        title="Contact OmoolaEx"
        subtitle="We’re here to help you build your digital success. Reach out today."
      />
      <ContactInfo />
      <ContactFormMap />
    </main>
  );
}
