import Head from 'next/head'
import PageHero from '@/components/PageHero'
import CareersHero from '@/components/Careers/CareersHero'
import WhyWorkOmoolaEx from '@/components/Careers/WhyWorkOmoolaEx'
import Careers, { jobs as jobListings } from '@/components/Careers/Careers'
import PerksAndBenefits from '@/components/Careers/PerksAndBenefits'
import HowWeWork from '@/components/Careers/HowWeWork'
import CareersForm from '@/components/Careers/CareersForm'
import PageViewTracker from '@/components/Analytics/PageViewTracker'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://omoolaex.com.ng'
    : 'http://localhost:3000')

// OmoolaEx company address
const companyAddress = {
  streetAddress:
    'Rgnt Palace, 8 R.T.S. Apena Cl, Oriyomi St, Off Olowu Street, Opebi, Ikeja 100271',
  addressLocality: 'Lagos',
  addressRegion: 'LA',
  postalCode: '100271',
  addressCountry: 'NG',
}

export default function CareersPage() {
  // Ensure jobListings is an array
  const jobsArray = Array.isArray(jobListings) ? jobListings : []

  // Separate full-time and internship jobs
  const fullTimeJobs = jobsArray.filter(job => job.type.toLowerCase() !== 'internship')
  const internshipJobs = jobsArray.filter(job => job.type.toLowerCase() === 'internship')

  // Helper function to create JobPosting JSON-LD
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
        name: 'OmoolaEx',
        sameAs: siteUrl,
        logo: `${siteUrl}/images/omoolaex-logo.svg`,
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
        value: { '@type': 'QuantitativeValue', value: 0, unitText: 'MONTH' },
      },
      ...(isRemote && { applicantLocationRequirements: { '@type': 'Country', name: 'NG' } }),
    }
  }

  // Build structured data array
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Careers Opportunities at OmoolaEx',
      url: `${siteUrl}/careers`,
      description:
        'Explore job opportunities and grow your career at OmoolaEx. Work on innovative web development, branding, IT consulting, and digital solutions projects.',
      publisher: {
        '@type': 'Organization',
        name: 'OmoolaEx',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/omoolaex-logo.svg` },
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

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <PageViewTracker
        title="Careers Opportunities at OmoolaEx"
        path="/careers"
        location={`${siteUrl}/careers`}
      />

      <main className="flex flex-col overflow-x-hidden">
        <PageHero
          title="Join Our Team"
          subtitle="Grow your career at OmoolaEx and work on innovative IT, web development, and branding projects."
        />
        <CareersHero />
        <WhyWorkOmoolaEx />
        <Careers />
        <PerksAndBenefits />
        <HowWeWork />
        <CareersForm />
      </main>
    </>
  )
}
