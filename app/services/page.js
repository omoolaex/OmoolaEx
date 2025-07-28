import Script from 'next/script';
import PageHero from '@/components/PageHero';
import ServicesCTA from '@/components/Services/ServicesCTA';
import ServicesGrid from '@/components/Services/ServicesGrid';
import WhyChooseUs from '@/components/Services/WhyChooseUs';

export const metadata = {
  title: 'Our Services | OmoolaEx | Web Development Experts & Digital Agency in Lagos, Nigeria',
  description:
    'Discover OmoolaEx, a forward-thinking digital agency based in Lagos, Nigeria. We specialize in web development, branding, and IT consulting services tailored to startups and SMEs.',
  keywords: [
    'Web Development',
    'Software Development',
    'Brand Design',
    'IT Consulting',
    'Networking',
    'Cybersecurity',
    'IT Training',
    'Mobile App Development',
    'IT Outsourcing',
  ],
  alternates: {
    canonical: 'https://omoolaex.com.ng/services',
  },
  openGraph: {
    title: 'Our Services | OmoolaEx',
    description:
      'Explore OmoolaEx services including web development, branding, IT consulting, and digital solutions. We help startups and SMEs grow online across Nigeria.',
    url: 'https://omoolaex.com.ng/services',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Services Page Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmoolaEx Services',
    description:
      'Discover how OmoolaEx empowers startups and SMEs through innovative web development, branding, and digital consulting services.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Our Services | OmoolaEx",
  "url": "https://omoolaex.com.ng/services",
  "description":
    "Explore our web development, branding, and IT consulting services tailored to your business goals. OmoolaEx helps startups and SMEs grow online.",
  "publisher": {
    "@type": "Organization",
    "name": "OmoolaEx",
    "url": "https://omoolaex.com.ng",
    "logo": {
      "@type": "ImageObject",
      "url": "https://omoolaex.com.ng/images/omoolaex.jpg"
    }
  },
  "mainEntity": [
    {
      "@type": "Service",
      "name": "Web Design & Development",
      "description": "Responsive websites built for performance, SEO, and user experience.",
      "areaServed": "Nigeria",
      "provider": { "@type": "Organization", "name": "OmoolaEx" }
    },
    {
      "@type": "Service",
      "name": "Brand Design & Strategy",
      "description": "Unique brand identities created for startups and SMEs using modern design tools.",
      "areaServed": "Nigeria",
      "provider": { "@type": "Organization", "name": "OmoolaEx" }
    },
    {
      "@type": "Service",
      "name": "IT Consulting & Digital Solutions",
      "description": "Custom IT services including cybersecurity, software development, and digital marketing.",
      "areaServed": "Nigeria",
      "provider": { "@type": "Organization", "name": "OmoolaEx" }
    }
  ]
};

export default function Services() {
  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

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

      <div>
        <PageHero />
        <ServicesGrid />
        <WhyChooseUs />
        <ServicesCTA />
      </div>
    </main>
  );
}