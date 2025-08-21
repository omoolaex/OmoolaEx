import Script from 'next/script';
import PageHero from '@/components/PageHero';
import PortfolioCTA from '@/components/Portfolio/PortfolioCTA';
import PortfolioPageClient from '@/components/Portfolio/PortfolioPageClient';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000');

export const metadata = {
  title: 'Our Portfolio | OmoolaEx | Projects Showcase',
  description:
    'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects for businesses across industries.',
  keywords: [
    'OmoolaEx portfolio',
    'web development projects',
    'software solutions',
    'branding showcase',
    'IT consulting projects',
  ],
  alternates: { canonical: `${siteUrl}/portfolio` },
  openGraph: {
    title: 'Our Portfolio | OmoolaEx',
    description:
      'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects.',
    url: `${siteUrl}/portfolio`,
    siteName: 'OmoolaEx',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/omoolaex.jpg`,
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Portfolio | OmoolaEx',
    description:
      'Check out OmoolaEx portfolio showcasing web development, branding, IT consulting, and software solutions.',
    images: [`${siteUrl}/images/omoolaex.jpg`],
    site: '@omoolaex',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'OmoolaEx Portfolio',
  description:
    'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects for businesses across industries.',
  url: `${siteUrl}/portfolio`,
  publisher: {
    '@type': 'Organization',
    name: 'OmoolaEx',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo.png`,
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteUrl}/portfolio` },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-portfolio"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Pageview Tracker */}
      <PageViewTracker
        title="Our Portfolio | OmoolaEx"
        path="/portfolio"
        location={`${siteUrl}/portfolio`}
      />

      {/* Page Content */}
      <PageHero
        title="Our Portfolio"
        subtitle="Showcasing our successful projects across web, software, and IT solutions"
      />
      <PortfolioPageClient /> {/* Client-only dynamic portfolio logic */}
      <PortfolioCTA />
    </main>
  );
}
