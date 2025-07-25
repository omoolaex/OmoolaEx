import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FAQs/FaqAccordion';
import FaqCTA from './FaqCTA';
import FaqStructuredData from '@/components/FAQs/FaqStructuredData';
import PageViewTracker from '@/components/Analytics/PageViewTracker';

export const generateMetadata = () => ({
  title: 'FAQs | Frequently Asked Questions | OmoolaEx',
  description: 'Find answers to common questions...',
  // rest unchanged
});

export default function FAQs() {
  return (
    <>
      <PageViewTracker
        title="FAQs | Frequently Asked Questions | OmoolaEx"
        path="/faqs"
        location="https://omoolaex.com.ng/faqs"
      />

      <main>
        <PageHero
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about working with OmoolaEx."
        />
        <FaqAccordion />
        <FaqCTA />
        <FaqStructuredData />
      </main>
    </>
  );
}