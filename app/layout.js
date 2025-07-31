import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DiscountPopup from "@/components/DiscountPopup";
import CookieConsent from "@/components/CookieConsent";
import { GA_TRACKING_ID } from "../lib/ga";
import StyledComponentsRegistry from "@/lib/styledComponentsRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  alternates: {
    canonical: 'https://omoolaex.com.ng',
  },
  title: 'OmoolaEx | Web Development, Branding & IT Consulting in Lagos, Nigeria',
  description:
    'OmoolaEx offers expert web development, responsive website design, branding, and IT consulting services in Lagos, Nigeria. Grow your business online with our digital solutions tailored for startups, SMEs, and enterprises.',
  keywords: [
    'OmoolaEx',
    'Web Development Lagos',
    'Web Design Nigeria',
    'IT Consulting Lagos',
    'Branding Services Lagos',
    'Digital Agency Nigeria',
    'SEO Lagos',
    'Responsive Website Design',
    'WordPress Developer Nigeria',
    'Business Website Lagos',
    'Custom Web Solutions',
    'Lagos Tech Company',
    'UI UX Design Lagos',
    'Ecommerce Development Nigeria',
  ],
  openGraph: {
    title: 'OmoolaEx | Web Development, Branding & IT Consulting in Lagos, Nigeria',
    description:
      'OmoolaEx provides professional web development, branding, and IT consulting services in Lagos, Nigeria. Boost your business with modern, SEO-optimized websites and digital solutions.',
    url: 'https://omoolaex.com.ng',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx – Web Development, Branding & IT Consulting in Lagos',
      },
    ],
    type: 'website',
  },
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  icons: {
    icon: '/site-icon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmoolaEx | Web Development, Branding & IT Consulting in Lagos, Nigeria',
    description:
      'Get modern, SEO-optimized websites, branding, and IT consulting from OmoolaEx in Lagos, Nigeria. Empower your business online.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmoolaEx",
  url: "https://omoolaex.com.ng",
  logo: "https://omoolaex.com.ng/images/omoolaex.jpg",
  sameAs: [
    "https://www.facebook.com/OmoolaEx",
    "https://www.instagram.com/omoolaex_",
    "https://twitter.com/omoolaex",
    "https://www.youtube.com/@omoolaex",
    "https://www.tiktok.com/@omoolaex",
    "https://www.linkedin.com/company/omoolaex-it-consulting-company"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2347089217123",
    contactType: "Customer Service",
    areaServed: "NG",
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics 4 */}
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

        {/* ✅ Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StyledComponentsRegistry>
          <Analytics />
          <SpeedInsights />
          <Navbar className="sticky" />
          <DiscountPopup />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}