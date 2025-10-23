// app/about/page.js

import Script from "next/script";
import AboutHero from "@/components/AboutUs/Hero";
import PageHero from "@/components/PageHero";
import OurStory from "@/components/AboutUs/OurStory";
import WhatDriveUs from "@/components/AboutUs/WhatDriveUs";
import WhyUs from "@/components/AboutUs/WhyUs";
import WhoWeServe from "@/components/AboutUs/WhoWeServe";
import OurProcess from "@/components/Home/OurProcess";
import WhyTrustUs from "@/components/AboutUs/WhyTrustUs";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import OurTeam from "@/components/AboutUs/OurTeam";
import Gallery from "@/components/AboutUs/gallery";
import CTA from "@/components/AboutUs/cta";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

/* -------------------------------------------------------
   ✅ METADATA — Updated for SEO & Brand Consistency
------------------------------------------------------- */
export const metadata = {
  title:
    "About Us | OmoolaEx IT Consultancy | Thinking Differently | Digital Transformation in Nigeria",
  description:
    "OmoolaEx IT Consultancy is a forward-thinking technology firm based in Lagos, Nigeria. Learn about our mission, values, and expertise in IT consulting, cloud infrastructure, cybersecurity, and digital transformation.",
  keywords: [
    "About OmoolaEx IT Consultancy",
    "IT Consulting Nigeria",
    "Digital Transformation Experts",
    "Cloud Solutions Lagos",
    "Cybersecurity Consulting",
    "Systems Integration Nigeria",
    "Technology Consulting Lagos",
    "Managed IT Services Nigeria",
    "OmoolaEx Team",
    "Thinking Differently",
  ],
  alternates: {
    canonical: "https://omoolaex.com.ng/about",
  },
  openGraph: {
    title:
      "About OmoolaEx IT Consultancy | Thinking Differently | Trusted IT Partner in Nigeria",
    description:
      "Learn about OmoolaEx IT Consultancy — a trusted technology partner for Nigerian businesses. Discover our values, team, and commitment to innovation, reliability, and measurable impact.",
    url: "https://omoolaex.com.ng/about",
    siteName: "OmoolaEx IT Consultancy",
    images: [
      {
        url: "https://omoolaex.com.ng/images/omoolaex.jpg",
        width: 1200,
        height: 630,
        alt: "OmoolaEx IT Consultancy - About Us Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About OmoolaEx IT Consultancy | Thinking Differently | Technology Partners in Nigeria",
    description:
      "Discover the people, principles, and innovation behind OmoolaEx IT Consultancy — delivering trusted IT strategy, cloud, and cybersecurity solutions across Nigeria.",
    images: ["https://omoolaex.com.ng/images/omoolaex.jpg"],
    site: "@omoolaex",
  },
};

/* -------------------------------------------------------
   ✅ COMPONENT: ABOUT PAGE
------------------------------------------------------- */
export default function About() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ STRUCTURED DATA: AboutPage */}
      <Script
        id="structured-data-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About OmoolaEx IT Consultancy",
            description:
              "Learn about OmoolaEx IT Consultancy, our mission, values, and how we help businesses across Nigeria with digital transformation, cloud infrastructure, and IT consulting services.",
            url: "https://omoolaex.com.ng/about",
            publisher: {
              "@type": "Organization",
              name: "OmoolaEx IT Consultancy Ltd",
              logo: "https://omoolaex.com.ng/images/logo.svg",
            },
          }),
        }}
      />

      {/* ✅ STRUCTURED DATA: Organization */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OmoolaEx IT Consultancy Ltd",
            legalName: "OmoolaEx IT Consultancy Ltd",
            url: "https://omoolaex.com.ng",
            logo: "https://omoolaex.com.ng/images/logo.svg",
            slogan: "Thinking Differently",
            description:
              "OmoolaEx IT Consultancy is a Nigerian technology consulting firm providing digital transformation, IT strategy, cloud infrastructure, cybersecurity, and managed IT services.",
            sameAs: [
              "https://www.facebook.com/OmoolaEx",
              "https://www.instagram.com/omoolaex_",
              "https://twitter.com/omoolaex",
              "https://www.youtube.com/@omoolaex",
              "https://www.tiktok.com/@omoolaex",
              "https://www.linkedin.com/company/omoolaex-it-consulting-company",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+2347089217123",
              contactType: "Customer Service",
              areaServed: "NG",
              availableLanguage: ["English"],
            },
            founder: {
              "@type": "Person",
              name: "Owolabi Gbolahan",
              jobTitle: "Founder & Managing Consultant",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi",
              addressLocality: "Ikeja",
              addressRegion: "Lagos",
              postalCode: "100271",
              addressCountry: "NG",
            },
          }),
        }}
      />

      {/* ✅ PAGEVIEW TRACKING */}
      <PageViewTracker
        title="About OmoolaEx IT Consultancy | Thinking Differently | Lagos, Nigeria"
        path="/about"
        location="https://omoolaex.com.ng/about"
      />

      {/* ✅ PAGE SECTIONS */}
      <div className="flex flex-col overflow-x-hidden">
        <PageHero />
        <AboutHero />
        <OurStory />
        <WhatDriveUs />
        <WhyUs />
        <WhoWeServe />
        <OurProcess />
        <WhyTrustUs />
        <OurTeam />
        <CTA />
      </div>
    </main>
  );
}
