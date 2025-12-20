import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from '@next/third-parties/google'; // Requires npm install @next/third-parties
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import CookieConsent from "@/components/CookieConsent";
import { GA_TRACKING_ID } from "../lib/ga";
import StyledComponentsRegistry from "@/lib/styledComponentsRegistry";
import FloatingContactActions from "@/components/FloatingContactActions";
import { Providers } from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://omoolaex.com.ng'),
  alternates: {
    canonical: "/",
  },
  title: "OmoolaEx | IT Consulting Firm in Nigeria | Digital Transformation & Cloud Solutions",
  description:
    "OmoolaEx is an IT consulting firm in Nigeria helping businesses navigate digital transformation. We provide IT strategy consulting, cloud solutions, custom software, managed IT services, and digital growth consulting across Lagos and West Africa.",
  keywords: [
    "IT Consulting Firm Nigeria",
    "IT Consulting Lagos",
    "Digital Transformation Consulting Nigeria",
    "Cloud Solutions Nigeria",
    "Managed IT Services Lagos",
    "Custom Software Development Nigeria",
  ],
  verification: {
    google: "f8UAWQDAokSA_8RVGOPAinyV895VBHIKbpPxbQkhMX4",
  },
  openGraph: {
    title: "OmoolaEx | IT Consulting Firm in Nigeria",
    description: "Expert IT consulting services in Nigeria including strategy, cloud migration, and managed services.",
    url: "https://omoolaex.com.ng",
    siteName: "OmoolaEx",
    images: [{ url: "/images/omoolaex.jpg", width: 1200, height: 630, alt: "OmoolaEx IT Consulting" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@omoolaex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OmoolaEx IT Consultancy Ltd",
  "url": "https://omoolaex.com.ng",
  "logo": "https://omoolaex.com.ng/images/omoolaex.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+2347089217123",
    "contactType": "Customer Service",
  },
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "IT Consulting & Advisory",
      "description": "Strategic IT guidance and digital transformation for businesses in Nigeria."
    },
    {
      "@type": "Service",
      "serviceType": "Cloud Solutions & IT Infrastructure",
      "description": "Cloud migration and data security solutions."
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Using @next/third-parties for GTM is more efficient. 
          It handles the script injection and the noscript automatically.
      */}
      <GoogleTagManager gtmId="GTM-THBBB5GM" />

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        
        {/* Google Analytics - Loaded after page is interactive to save performance */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
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

        {/* Structured Data Script */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* External Ahrefs Analytics */}
        <Script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="CoV3WdOBMx/5LHIhEDzKnw" 
          strategy="lazyOnload" 
        />

        <StyledComponentsRegistry>
          <Navbar className="sticky" />
          
          <main className="grow">
            <Providers>
              {children}
              <FloatingContactActions />
            </Providers>
          </main>
          
          <Footer />
          <Popup />
          <CookieConsent />
        </StyledComponentsRegistry>

        {/* Vercel Tracking */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}