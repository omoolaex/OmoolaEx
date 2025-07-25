import PageHero from "@/components/PageHero";
import RequestQuoteForm from "@/components/RequestQuoteForm";

export default function RequestQuote() {
  return (
    <>
      <PageHero
        title="Request a Free Quote"
        subtitle="Let’s bring your digital vision to life. Tell us what you need, and we’ll handle the rest."
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <RequestQuoteForm />
      </div>
    </>
  );
}