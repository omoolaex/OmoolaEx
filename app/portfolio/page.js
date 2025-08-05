import Head from 'next/head';
import PageHero from '@/components/PageHero';
import PortfolioCTA from '@/components/Portfolio/PortfolioCTA';
import PortfolioContainer from '@/components/Portfolio/PortfolioContainer';
import PortfolioPageClient from '@/components/Portfolio/PortfolioPageClient';

export const metadata = {
  title: 'Our Portfolio | OmoolaEx | Our Projects Showcase',
  description:
    'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects for businesses across industries.',
  keywords:
    'OmoolaEx portfolio, web development showcase, software projects, IT solutions',
  openGraph: {
    title: 'Our Portfolio | OmoolaEx',
    description:
      'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects.',
    url: 'https://omoolaex.com.ng/portfolio',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Our Portfolio | OmoolaEx',
              description:
                'Explore OmoolaEx portfolio showcasing web development, mobile apps, software solutions, branding, and IT projects for businesses across industries.',
              url: 'https://omoolaex.com.ng/portfolio',
              publisher: {
                '@type': 'Organization',
                name: 'OmoolaEx',
                url: 'https://omoolaex.com.ng',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://omoolaex.com.ng/logo.png',
                },
              },
            }),
          }}
        />
      </Head>

      <main>
        <PageHero
          title="Our Portfolio"
          subtitle="Showcasing our successful projects across web, software, and IT solutions"
        />
        <PortfolioPageClient /> {/* ✅ Client-only logic here */}
        <PortfolioCTA />
      </main>
    </>
  );
}