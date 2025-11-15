import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import CookieConsent from "@/components/CookieConsent";
import { GA_TRACKING_ID } from "../lib/ga";
import StyledComponentsRegistry from "@/lib/styledComponentsRegistry";
import FloatingContactActions from "@/components/FloatingContactActions";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  alternates: {
    canonical: "https://omoolaex.com.ng",
  },
  title: "OmoolaEx | IT Consulting Firm in Nigeria | Digital Transformation & Cloud Solutions",
  description:
    "OmoolaEx is an IT consulting firm in Nigeria helping businesses navigate digital transformation. We provide IT strategy consulting, cloud solutions, custom software, managed IT services, and digital growth consulting across Lagos and West Africa.",
  keywords: [
    "IT Consulting Firm Nigeria",
    "IT Consulting Lagos",
    "Digital Transformation Consulting Nigeria",
    "IT Solutions Nigeria",
    "Technology Consulting Nigeria",
    "Cloud Solutions Nigeria",
    "Managed IT Services Lagos",
    "Custom Software Development Nigeria",
    "Cybersecurity Training Nigeria",
    "IT Infrastructure Services Lagos",
    "Business IT Consulting Nigeria",
    "Systems Integration Nigeria",
    "OmoolaEx IT Consulting",
  ],
  openGraph: {
    title: "OmoolaEx | IT Consulting Firm in Nigeria | Digital Transformation & Cloud Solutions",
    description:
      "OmoolaEx provides expert IT consulting services in Nigeria — including IT strategy, digital transformation, cloud migration, software development, and managed IT services for startups, SMEs, and enterprises.",
    url: "https://omoolaex.com.ng",
    siteName: "OmoolaEx",
    images: [
      {
        url: "https://omoolaex.com.ng/images/omoolaex.jpg",
        width: 1200,
        height: 630,
        alt: "OmoolaEx – IT Consulting Firm in Nigeria",
      },
    ],
    type: "website",
  },
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  icons: {
    icon: "/site-icon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx | IT Consulting Firm in Nigeria",
    description:
      "Strategic IT consulting and digital transformation services for Nigerian businesses. OmoolaEx delivers IT strategy, cloud solutions, managed services, and more.",
    images: ["https://omoolaex.com.ng/images/omoolaex.jpg"],
    site: "@omoolaex",
  },
};

// Updated Schema to match IT consulting structure
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmoolaEx IT Consultancy Ltd",
  legalName: "OmoolaEx IT Consultancy Ltd",
  url: "https://omoolaex.com.ng",
  logo: "https://omoolaex.com.ng/images/omoolaex.jpg",
  foundingDate: "2020",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi",
      addressLocality: "Ikeja",
      addressRegion: "Lagos",
      postalCode: "100271",
      addressCountry: "NG",
    },
  },
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
  "@graph": [
    {
      "@type": "Service",
      serviceType: "IT Consulting & Advisory",
      areaServed: "Nigeria",
      description:
        "Strategic IT guidance, digital transformation consulting, and technology cost optimization for businesses across Nigeria.",
    },
    {
      "@type": "Service",
      serviceType: "Digital Solutions & Systems Integration",
      areaServed: "Nigeria",
      description:
        "Custom software development, web and mobile applications, and systems integration services designed for Nigerian businesses.",
    },
    {
      "@type": "Service",
      serviceType: "Brand & Digital Growth Consulting",
      areaServed: "Nigeria",
      description:
        "Strategic brand and digital marketing consulting to help businesses grow with data-driven campaigns and optimized online presence.",
    },
    {
      "@type": "Service",
      serviceType: "Cloud Solutions & IT Infrastructure",
      areaServed: "Nigeria",
      description:
        "Cloud migration, IT infrastructure setup, data security, and disaster recovery solutions for modern business operations.",
    },
    {
      "@type": "Service",
      serviceType: "Managed IT Services & Capacity Building",
      areaServed: "Nigeria",
      description:
        "Ongoing IT support, cybersecurity training, and capacity-building programs that empower teams and ensure reliable operations.",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="f8UAWQDAokSA_8RVGOPAinyV895VBHIKbpPxbQkhMX4"
        />

        {/* ✅ Google Tag Manager */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-THBBB5GM');
          `}
        </Script>

        {/* ✅ Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* ✅ Structured Data for IT Consulting */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="CoV3WdOBMx/5LHIhEDzKnw" async></script>

        <link rel="alternate" type="application/rss+xml" title="OmoolaEx Blog" href="/api/rss.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="OmoolaEx Resource Library RSS Feed"
          href="/api/rss/resources"
        />
        <style>{`
          :root {
            --color-navy: #003767;
            --color-electric-blue: #178ddd;
            --color-violet: #8e3ec9;
            --color-white: #ffffff;
          }
        `}</style>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THBBB5GM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <StyledComponentsRegistry>
          <Analytics />
          <SpeedInsights />
          <Navbar className="sticky" />
          <Popup />
          <main className="flex-grow">
            {children}
            <FloatingContactActions />

          </main>
          <Footer />
          <CookieConsent />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
