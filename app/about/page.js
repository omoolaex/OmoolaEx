import Script from "next/script";
import AboutHero from "@/components/AboutUs/Hero";
import ContactTopCTA from "@/components/AboutUs/ContactTopCTA";
import OurStory from "@/components/AboutUs/OurStory";
import WhatDriveUs from "@/components/AboutUs/WhatDriveUs";
import WhyUs from "@/components/AboutUs/WhyUs";
import WhoWeServe from "@/components/AboutUs/WhoWeServe";
import OurProcess from "@/components/Home/OurProcess";
import WhyTrustUs from "@/components/AboutUs/WhyTrustUs";
import OurTeam from "@/components/AboutUs/OurTeam";
import CTA from "@/components/AboutUs/cta";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import PageHero from "@/components/PageHero";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://omoolaex.com.ng";

export const metadata = {
  title: "About OmoolaEx IT Consultancy | Thinking Differently in Nigeria",
  description:
    "Meet OmoolaEx IT Consultancy — Lagos-based IT strategists helping Nigerian businesses navigate digital transformation with confidence.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About OmoolaEx | Trusted IT Consulting in Nigeria",
    description:
      "Learn about OmoolaEx IT Consultancy — values, team, and story behind one of Nigeria’s most trusted IT consulting firms.",
    url: `${siteUrl}/about`,
    siteName: "OmoolaEx IT Consultancy",
    images: [
      {
        url: `${siteUrl}/images/about-og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy - About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OmoolaEx IT Consultancy | Thinking Differently",
    description:
      "Discover the team, values, and mission driving OmoolaEx IT Consultancy.",
    images: [`${siteUrl}/images/about-og-cover.jpg`],
  },
}

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About OmoolaEx IT Consultancy",
        description:
          "OmoolaEx helps Nigerian businesses succeed through IT strategy, cloud, and cybersecurity consulting.",
        url: `${siteUrl}/about`,
        publisher: {
          "@type": "Organization",
          name: "OmoolaEx IT Consultancy Ltd",
          logo: `${siteUrl}/images/logo.png`,
        },
      },
      {
        "@type": "LocalBusiness",
        name: "OmoolaEx IT Consultancy Ltd",
        url: siteUrl,
        image: `${siteUrl}/images/about-og-cover.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, Opebi, Ikeja",
          addressLocality: "Lagos",
          addressRegion: "Lagos",
          postalCode: "100271",
          addressCountry: "NG",
        },
        geo: { "@type": "GeoCoordinates", latitude: 6.5979, longitude: 3.3515 },
        telephone: "+2347089217123",
        sameAs: [
          "https://linkedin.com/company/omoolaex-it-consulting-company",
          "https://instagram.com/omoolaex_",
          "https://twitter.com/omoolaex",
        ],
      },
    ],
  }

  return (
    <main className="overflow-x-hidden relative">
      <Script
        id="structured-data-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageViewTracker
        title="About OmoolaEx IT Consultancy"
        path="/about"
        location={`${siteUrl}/about`}
      />

      {/* ✅ Sticky Navigation */}
      <PageHero />

      {/* ✅ Sections with improved layout rhythm */}
      <div className="flex flex-col overflow-x-hidden">
        <section id="about-hero">
          <AboutHero />
        </section>

        <ContactTopCTA />

        <section id="our-story">
          <OurStory />
        </section>

        <section id="our-team">
          <OurTeam />
        </section>

        <section id="what-drives-us">
          <WhatDriveUs />
        </section>

        <WhyUs />
        <WhoWeServe />
        <OurProcess />
        <WhyTrustUs />
        <CTA />
      </div>
    </main>
  )
}
