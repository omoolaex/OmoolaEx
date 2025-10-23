import PageHero from '@/components/PageHero'
import CareersHero from '@/components/Careers/CareersHero'
import WhyJoinOmoolaEx from '@/components/Careers/WhyWorkOmoolaEx'
import { jobs as jobListings } from '@/components/Careers/Careers'
import CareersForm from '@/components/Careers/CareersForm'
import PageViewTracker from '@/components/Analytics/PageViewTracker'
import AboutOmoolaEx from '@/components/Careers/AboutOmoolaEx'
import CareerPathways from '@/components/Careers/CareerPathways'
import JoinTalentNetwork from '@/components/Careers/JoinTalentNetwork'

// Base URL
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000')

// Company details for structured data
const companyAddress = {
  streetAddress: 'Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, Off Olowu Street, Opebi, Ikeja 100271',
  addressLocality: 'Lagos',
  addressRegion: 'LA',
  postalCode: '100271',
  addressCountry: 'NG',
}

// ✅ Static Metadata (auto injected into <head>)
export const metadata = {
  title: 'Careers at OmoolaEx | Build Africa’s Digital Future',
  description:
    'Join OmoolaEx IT Consultancy Ltd. We’re building a team of consultants, developers, and digital innovators shaping how businesses across Nigeria use technology.',
  keywords: [
    'IT consulting jobs Nigeria',
    'tech internship Lagos',
    'graduate trainee programme Nigeria',
    'IT consultancy careers',
    'OmoolaEx IT Consultancy Ltd',
    'digital transformation jobs Nigeria',
  ],
  openGraph: {
    title: 'Careers at OmoolaEx | Build Africa’s Digital Future',
    description:
      'Explore opportunities to grow with OmoolaEx, a Nigerian IT consultancy empowering businesses through digital transformation.',
    url: `${siteUrl}/careers`,
    type: 'website',
    siteName: 'OmoolaEx IT Consultancy Ltd',
    images: [
      {
        url: `${siteUrl}/images/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'OmoolaEx IT Consultancy Careers Nigeria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at OmoolaEx | IT Consulting Jobs in Nigeria',
    description:
      'Discover internship, volunteer, and graduate trainee opportunities at OmoolaEx IT Consultancy Ltd.',
    images: [`${siteUrl}/images/logo.svg`],
  },
  alternates: {
    canonical: `${siteUrl}/careers`,
  },
}

// ✅ Dynamic Structured Data (JSON-LD Schema)
function generateStructuredData(jobsArray) {
  const fullTimeJobs = jobsArray.filter((job) => job.type.toLowerCase() !== 'internship')
  const internshipJobs = jobsArray.filter((job) => job.type.toLowerCase() === 'internship')

  const createJobPosting = (job) => {
    const isRemote = job.location.toLowerCase().includes('remote')
    let employmentType = job.type.toUpperCase()
    if (employmentType === 'INTERNSHIP') employmentType = 'INTERN'

    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      datePosted: new Date().toISOString().split('T')[0],
      validThrough: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      employmentType,
      hiringOrganization: {
        '@type': 'Organization',
        name: 'OmoolaEx IT Consultancy Ltd',
        sameAs: siteUrl,
        logo: `${siteUrl}/images/logo.svg`,
      },
      jobLocation: {
        '@type': 'Place',
        address: isRemote
          ? { '@type': 'PostalAddress', addressCountry: 'NG', addressLocality: 'Remote' }
          : { '@type': 'PostalAddress', ...companyAddress },
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'NGN',
        value: { '@type': 'QuantitativeValue', value: 0, unitText: 'NONE' },
      },
    }
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Careers at OmoolaEx | IT Consulting Jobs in Nigeria',
      url: `${siteUrl}/careers`,
      description:
        'Explore future career opportunities at OmoolaEx IT Consultancy Ltd. Join a growing team shaping the future of technology, cloud systems, and digital transformation in Nigeria.',
      publisher: {
        '@type': 'Organization',
        name: 'OmoolaEx IT Consultancy Ltd',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo.svg` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: `${siteUrl}/careers` },
      ],
    },
    ...fullTimeJobs.map(createJobPosting),
    ...internshipJobs.map(createJobPosting),
  ]
}

// ✅ Page Component
export default function CareersPage() {
  const jobsArray = Array.isArray(jobListings) ? jobListings : []
  const structuredData = generateStructuredData(jobsArray)

  // Analytics Event Tracker
  const trackEvent = (action, label) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'Careers',
        event_label: label,
        page_location: `${siteUrl}/careers`,
      })
    }
  }

  return (
    <>
      {/* JSON-LD for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page View Tracking */}
      <PageViewTracker
        title="Careers at OmoolaEx"
        path="/careers"
        location={`${siteUrl}/careers`}
      />

      {/* Page Sections */}
      <main className="flex flex-col overflow-x-hidden">
        <PageHero />
        <CareersHero />
        <AboutOmoolaEx />
        <WhyJoinOmoolaEx />
        <CareerPathways />
        <JoinTalentNetwork />
        <CareersForm />
      </main>
    </>
  )
}
