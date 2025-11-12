// app/page.js
import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";

import Services from "../components/Home/Services";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Portfolio from "../components/Home/Portfolio";
import WhyChoose from "../components/Home/WhyChoose";
import Testimonials from "../components/Home/Testimonials";
import OurProcess from "../components/Home/OurProcess";
import CTASection from "../components/Home/CTA";
import NewsSection from "@/components/Home/news";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

/* ---------------------------------------------
   🔹 Metadata for App Router
--------------------------------------------- */
export const metadata = {
  title:
    "OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria",
  description:
    "OmoolaEx IT Consultancy helps Nigerian businesses navigate digital transformation with clarity and confidence. We deliver IT strategy, cloud infrastructure, cybersecurity, and scalable systems built on trust, innovation, and measurable results.",
  keywords: [
    "IT Consulting Nigeria",
    "Digital Transformation",
    "Cloud Infrastructure",
    "Cybersecurity",
    "Systems Integration",
    "OmoolaEx IT Consultancy",
    "Managed IT Services",
  ],
  alternates: { canonical: "https://omoolaex.com.ng" },
  openGraph: {
    title: "OmoolaEx IT Consultancy | Thinking Differently",
    description:
      "Explore IT consulting, cloud solutions, and digital transformation insights for Nigerian businesses.",
    url: "https://omoolaex.com.ng",
    siteName: "OmoolaEx IT Consultancy",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://omoolaex.com.ng/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy - Thinking Differently",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx IT Consultancy | Thinking Differently",
    description:
      "Get expert IT consulting insights on cloud, cybersecurity, and digital transformation in Nigeria.",
    images: ["https://omoolaex.com.ng/images/og-image.png"],
    site: "@omoolaex",
  },
};

/* ---------------------------------------------
   🔹 Home Page Component
--------------------------------------------- */
export default async function Home() {
  // ✅ Fetch latest posts
  const latestPosts = await client.fetch(latestPostsQuery).catch(() => []);

  return (
    <main>
      {/* ✅ Page View Tracking */}
      <PageViewTracker
        title="OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria"
        path="/"
        location="https://omoolaex.com.ng"
      />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Testimonials */}
      <Testimonials />

      {/* Our Process */}
      <OurProcess />

      {/* Latest News / Blog */}
      <NewsSection posts={latestPosts} />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
