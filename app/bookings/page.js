import PageHero from '@/components/PageHero';
import PageViewTracker from '@/components/Analytics/PageViewTracker';
import BookingForm from '@/components/bookings/BookingForm';

export const metadata = {
  title: 'Book a Free Consultation | OmoolaEx IT Consultancy',
  description:
    'Easily book a free consultation with OmoolaEx. Choose your preferred date and time to discuss web development, branding, IT consulting, or digital growth strategies.',
  keywords: [
    'IT Consultancy',
    'Book Consultation',
    'Web Development Lagos',
    'IT Consulting Nigeria',
    'Brand Design',
    'Digital Agency',
    'Tech Solutions',
    'OmoolaEx',
  ],
  alternates: { canonical: 'https://omoolaex.com.ng/bookings' },
  openGraph: {
    title: 'Book a Free Consultation | OmoolaEx',
    description:
      'Schedule your free consultation with OmoolaEx. Our IT consulting, web development, and branding experts are ready to help your business grow.',
    url: 'https://omoolaex.com.ng/bookings',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Bookings Page',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Consultation | OmoolaEx',
    description:
      'Schedule a free consultation with OmoolaEx experts in IT, branding, and digital solutions.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

export default function BookingsPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://omoolaex.com.ng'
      : 'http://localhost:3000');

  const pageUrl = `${siteUrl}/bookings`;

  // Structured Data for WebPage + Breadcrumb
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Book a Free Consultation | OmoolaEx',
      url: pageUrl,
      description:
        'Book a free consultation with OmoolaEx for IT consulting, web development, branding, and digital solutions.',
      publisher: {
        '@type': 'Organization',
        name: 'OmoolaEx',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/omoolaex.jpg` },
      },
      mainEntity: {
        '@type': 'Service',
        name: 'Consultation Booking',
        description:
          'Free 30-minute consultation with OmoolaEx to discuss IT and digital business growth.',
        provider: { '@type': 'Organization', name: 'OmoolaEx' },
        areaServed: 'Nigeria',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Bookings', item: pageUrl },
      ],
    },
  ];

  return (
    <main className="overflow-x-hidden relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pageview Tracking */}
      <PageViewTracker url={pageUrl} />

      {/* Hero Section */}
      <PageHero
        title="Book a Free Consultation"
        subtitle="Schedule your preferred date and time to discuss web development, branding, IT consulting, or digital growth strategies."
      />

      {/* Calendly Widget */}
      <BookingForm />
    </main>
  );
}
