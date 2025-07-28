import Script from 'next/script';
import PageHero from '@/components/PageHero';
import ContactFormMap from '@/components/Contact/ContactFormMap';
import ContactInfo from '@/components/Contact/ContactInfo';

export const metadata = {
  title: 'Contact Us | OmoolaEx | Let’s Discuss Your Project',
  description:
    'Get in touch with OmoolaEx for web development, branding, and IT consulting. We’re here to answer your questions and help build your digital success.',
  keywords: [
    'Contact OmoolaEx',
    'Web Development Nigeria',
    'IT Consulting Lagos',
    'Branding Company Contact',
    'Request Quote Web Design',
    'Talk to OmoolaEx',
    'Contact Digital Agency',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/contact',
  },
  openGraph: {
    title: 'Get in Touch | OmoolaEx',
    description:
      'Need help with your web project or branding? Reach out to OmoolaEx today for expert advice and custom solutions.',
    url: 'https://omoolaex.com.ng/contact',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact OmoolaEx',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact OmoolaEx',
    description: 'Reach out to OmoolaEx to discuss your digital goals. We reply quickly.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

export default function Contact() {
  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data for Contact Page */}
      <Script
        id="structured-data-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us - OmoolaEx",
            "description":
              "Connect with OmoolaEx for expert IT consulting, web development, and digital branding services. Let's bring your ideas to life.",
            "url": "https://omoolaex.com.ng/contact",
          }),
        }}
      />

      {/* Organization Structured Data */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OmoolaEx",
            "url": "https://omoolaex.com.ng",
            "logo": "https://omoolaex.com.ng/images/omoolaex.jpg",
            "sameAs": [
              "https://www.facebook.com/OmoolaEx",
              "https://www.instagram.com/omoolaex_",
              "https://twitter.com/omoolaex",
              "https://www.youtube.com/@omoolaex",
              "https://www.tiktok.com/@omoolaex",
              "https://www.linkedin.com/company/omoolaex-it-consulting-company"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+2347089217123",
              "contactType": "Customer Support",
              "areaServed": "NG",
              "availableLanguage": ["English"]
            }
          }),
        }}
      />

      {/* Page Content */}
      <div>
        <PageHero />
        <ContactInfo />
        <ContactFormMap />
      </div>
    </main>
  );
}