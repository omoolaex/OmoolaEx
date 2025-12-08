import ResultsClient from './ResultsClient';

export const metadata = {
  title: "OmoolaEx IT Audit | IT Audit Results",
  description:
    "View the results of your IT audit, including risk levels, scores, and actionable recommendations for your business.",
  robots: "noindex, nofollow",
};

export default function Page({ params }) {
  // pass the ID to the client component
  return <ResultsClient id={params.id} />;
}
