import PageHero from '@/components/PageHero';
import CalendlyWidget from './CalendlyWidget';

export const metadata = {
  title: 'Book a Free Consultation | OmoolaEx | Web Development & IT Consulting in Lagos, Nigeria',
  description:
    'Easily book a free consultation with OmoolaEx. Choose your preferred date and time to discuss web development, branding, IT consulting, or digital growth strategies.',
  keywords: [
    'Book Consultation',
    'Web Development Lagos',
    'IT Consulting Nigeria',
    'Brand Design',
    'Digital Agency',
    'Tech Solutions',
    'OmoolaEx',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/bookings',
  },
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
  // Structured Data for SEO
  const bookingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Book a Consultation | OmoolaEx',
    url: 'https://omoolaex.com.ng/bookings',
    description:
      'Book a free consultation with OmoolaEx for IT consulting, web development, and branding services.',
    publisher: {
      '@type': 'Organization',
      name: 'OmoolaEx',
      url: 'https://omoolaex.com.ng',
      logo: {
        '@type': 'ImageObject',
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
      },
    },
    mainEntity: {
      '@type': 'Service',
      name: 'Consultation Booking',
      description:
        'Free 30-minute consultation with OmoolaEx to discuss IT and digital business growth.',
      provider: {
        '@type': 'Organization',
        name: 'OmoolaEx',
      },
      areaServed: 'Nigeria',
    },
  };

  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingSchema) }}
      />

      <PageHero />
      <CalendlyWidget />
    </main>
  );
}
