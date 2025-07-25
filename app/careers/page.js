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
  description: 'Explore job opportunities and grow your career at OmoolaEx...',
  // rest unchanged
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Careers at OmoolaEx",
  // rest unchanged
};

export default function CareersPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <PageViewTracker
        title="Careers Opportunities at OmoolaEx"
        path="/careers"
        location="https://omoolaex.com.ng/careers"
      />

      <main>
        <PageHero />
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