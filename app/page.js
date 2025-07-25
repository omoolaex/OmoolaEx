import Head from 'next/head'
import Services from '../components/Home/Services'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Portfolio from '../components/Home/Portfolio'
import Testimonials from '../components/Home/Testimonials'
import OurProcess from '../components/Home/OurProcess'
import OurTechnologies from '../components/Home/OurTechnologies'
import CTASection from '../components/Home/CTA'
import NewsSection from '@/components/Home/news'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OmoolaEx",
  "url": "https://www.omoolaex.com",
  "logo": "https://omoolaex.com.ng/images/logo.svg",
  "sameAs": [
    "https://www.facebook.com/OmoolaEx",
    "https://www.instagram.com/omoolaex_",
    "https://twitter.com/omoolaex",
    "https://www.youtube.com/@omoolaex",
    "https://www.tiktok.com/@omoolaex",
    "https://www.linkedin.com/company/omoolaex-it-consulting-company"
  ],
  "description": "OmoolaEx is a creative IT consulting company offering web design, branding, cybersecurity, and digital strategy services in Nigeria.",
  "founder": {
    "@type": "Person",
    "name": "Owolabi Gbolahan"
  }
}

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://omoolaex.com.ng",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://omoolaex.com.ng/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export default function Home() {
  return (
    <main>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, websiteStructuredData])
          }}
        />
      </Head>

      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <OurProcess />
      <OurTechnologies />
      <NewsSection />
      <CTASection />
    </main>
  )
}