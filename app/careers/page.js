import Head from 'next/head';
import PageHero from '@/components/PageHero';
import CareersHero from '@/components/Careers/CareersHero';
import WhyWorkOmoolaEx from '@/components/Careers/WhyWorkOmoolaEx';
import Careers from '@/components/Careers/Careers';
import PerksAndBenefits from '@/components/Careers/PerksAndBenefits';
import HowWeWork from '@/components/Careers/HowWeWork';
import CareersForm from '@/components/Careers/CareersForm';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

export const metadata = {
  title: 'Careers Opportunities at OmoolaEx | Join Our Innovative Team',
  description:
    'Explore job opportunities and grow your career at OmoolaEx. Work on innovative web development, branding, IT consulting, and digital solutions projects.',
  keywords:
    'OmoolaEx careers, IT jobs Nigeria, web development jobs, tech jobs Lagos, branding careers, digital agency careers, IT consulting careers',
  alternates: { canonical: 'https://omoolaex.com.ng/careers' },
  openGraph: {
    title: 'Careers Opportunities at OmoolaEx',
    description:
      'Join OmoolaEx and advance your career in IT, web development, branding, and digital solutions. Explore current job openings.',
    url: 'https://omoolaex.com.ng/careers',
    siteName: 'OmoolaEx',
    type: 'website',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex-careers.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Careers Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers Opportunities at OmoolaEx',
    description:
      'Join OmoolaEx and advance your career in IT, web development, branding, and digital solutions.',
    images: ['https://omoolaex.com.ng/images/omoolaex-careers.jpg'],
    site: '@omoolaex',
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000');

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers Opportunities at OmoolaEx',
    url: `${siteUrl}/careers`,
    description:
      'Explore job opportunities and grow your career at OmoolaEx. Work on innovative web development, branding, IT consulting, and digital solutions projects.',
    publisher: {
      '@type': 'Organization',
      name: 'OmoolaEx',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/omoolaex-logo.svg`,
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: `${siteUrl}/careers` },
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* ✅ Track GA pageviews */}
      <PageViewTracker
        title="Careers Opportunities at OmoolaEx"
        path="/careers"
        location={`${siteUrl}/careers`}
      />

      <main className="flex flex-col overflow-x-hidden">
        <PageHero
          title="Join Our Team"
          subtitle="Grow your career at OmoolaEx and work on innovative IT, web development, and branding projects."
        />
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
