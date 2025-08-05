'use client';

import PageViewTracker from '@/components/Analytics/PageViewTracker';
import PortfolioContainer from './PortfolioContainer';

export default function PortfolioPageClient() {
  return (
    <>
      <PageViewTracker
        title="Our Portfolio | OmoolaEx"
        path="/portfolio"
        location="https://omoolaex.com.ng/portfolio"
      />
      <PortfolioContainer />
    </>
  );
}