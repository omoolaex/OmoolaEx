import Head from 'next/head';
import PageHero from '@/components/PageHero';
import PortfolioCTA from '@/components/Portfolio/PortfolioCTA';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

export const metadata = {
  title: 'Our Portfolio | OmoolaEx | Our Projects Showcase',
  description: 'Explore our portfolio of successful web development...',
  // rest unchanged
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Portfolio | OmoolaEx",
  // rest unchanged
};

export default function Portfolio() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <PageViewTracker
        title="Our Portfolio | OmoolaEx"
        path="/portfolio"
        location="https://omoolaex.com.ng/portfolio"
      />

      <main>
        <PageHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
    </>
  );
}