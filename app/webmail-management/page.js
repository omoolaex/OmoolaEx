// app/webmail-management/page.jsx
// Pure JS version. No TypeScript types. Same modular structure.

import Link from "next/link";

export async function generateMetadata() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  return {
    title: "Webmail Management | OmoolaEx",
    description:
        "Professional, secure, and reliable webmail for SMEs. Custom domain emails, shared inboxes, anti-phishing, backups, and ongoing management.",
    keywords: [
        "webmail",
        "email hosting",
        "business email",
        "Nigerian SMEs",
        "DKIM",
        "SPF",
        "DMARC",
        "OmoolaEx",
    ],
    alternates: {
      canonical: `${siteUrl}/webmail-management`,
    },
    openGraph: {
        title: "Webmail Management | OmoolaEx",
        description:
        "Professional, secure, and reliable webmail for SMEs. Custom domain emails, shared inboxes, anti-phishing, backups, and ongoing management.",
              url: `${siteUrl}/webmail-management`,
      siteName: "OmoolaEx",
      images: [
        {
          url: `${siteUrl}/images/omoolaex.jpg`,
          width: 1200,
          height: 630,
          alt: "Webmail Management | OmoolaEx",
        },
      ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Webmail Management | OmoolaEx",
        description:
        "Professional, secure, and reliable webmail for SMEs. Custom domain emails, shared inboxes, anti-phishing, backups, and ongoing management.",
        images: [`${siteUrl}/images/omoolaex.jpg`],
        site: "@omoolaex",
    },
  };
};


// ---------- Shared atoms ----------
function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ id, eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary-600">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl font-semibold leading-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-neutral-600 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}

function PrimaryButton({ href = "#consult", children, ariaLabel }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? "Request a free consultation"}
      className="inline-flex items-center justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-black text-white focus-visible:ring-black"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href = "#packages", children, ariaLabel }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? "See packages"}
      className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-neutral-300 text-neutral-900 focus-visible:ring-neutral-400"
    >
      {children}
    </Link>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200">
          {icon}
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-neutral-600">{children}</p>
    </div>
  );
}

function PackageCard({ tier, priceNote, ctaText, href, bullets }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">{tier}</h3>
        <p className="mt-1 text-sm text-neutral-600">{priceNote}</p>
        <ul className="mt-4 space-y-2 text-sm text-neutral-800">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-800"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <PrimaryButton href={href} ariaLabel={`Choose ${tier}`}>
          {ctaText}
        </PrimaryButton>
      </div>
    </div>
  );
}

// ---------- Sections ----------
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.06),transparent_50%)]" />
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Professional, Secure & Reliable Email
          </h1>
          <p className="mt-4 text-sm text-neutral-700 sm:text-base">
            Give your business the credibility and protection it deserves with
            OmoolaEx Webmail. Branded addresses, anti-phishing, backups, and
            ongoing support.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="#consult">Get Started</PrimaryButton>
            <SecondaryButton href="#packages">See Packages</SecondaryButton>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            IMAP/POP/SMTP • DKIM/SPF/DMARC • Backups • Shared inboxes
          </p>
        </div>
      </Container>
    </section>
  );
}

function WhyItMatters() {
  return (
    <section aria-labelledby="why" className="border-t border-neutral-200">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          id="why"
          eyebrow="Why It Matters"
          title="First impressions count. Security matters."
          subtitle="Free addresses don’t inspire trust. With OmoolaEx Webmail, you get secure, branded email that builds credibility and scales with your team."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<EnvelopeIcon />} title="Custom Domain Emails">
            Branded addresses like <code>info@yourbusiness.com</code> with
            role-based inboxes for <code className="mx-1">sales@</code> and{" "}
            <code>support@</code>.
          </FeatureCard>
          <FeatureCard icon={<DeviceIcon />} title="Webmail & Mobile Access">
            Work anywhere with fast webmail and seamless sync across devices.
          </FeatureCard>
          <FeatureCard icon={<UsersIcon />} title="Shared Inboxes">
            Keep conversations visible and accountable across your team.
          </FeatureCard>
          <FeatureCard icon={<ShieldIcon />} title="Advanced Security">
            Anti-spam & phishing filters with DKIM, SPF, and DMARC correctly
            configured.
          </FeatureCard>
          <FeatureCard icon={<CloudIcon />} title="Backups & Archiving">
            Regular automated backups with on-request retrieval and retention
            options.
          </FeatureCard>
          <FeatureCard icon={<WrenchIcon />} title="Ongoing Management">
            We handle setup, monitoring, add/remove users, and troubleshooting.
          </FeatureCard>
        </div>
      </Container>
    </section>
  );
}

function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="border-t border-neutral-200 bg-neutral-50"
    >
      <Container className="py-12 sm:py-16">
        <SectionHeading
          id="packages-heading"
          eyebrow="Packages"
          title="Flexible plans that grow with you"
          subtitle="Start lean. Scale without disruption. Monthly or annual billing."
        />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <PackageCard
            tier="Starter"
            priceNote="Up to 5 accounts • 5GB per mailbox"
            ctaText="Choose Starter"
            href="#consult"
            bullets={[
              "Custom domain emails",
              "Webmail + mobile sync",
              "Basic spam protection",
            ]}
          />
          <PackageCard
            tier="Growth"
            priceNote="10–25 accounts • 10GB per mailbox"
            ctaText="Choose Growth"
            href="#consult"
            bullets={[
              "Shared calendars & contacts",
              "Advanced spam & phishing filters",
              "Monthly security check",
            ]}
          />
          <PackageCard
            tier="Enterprise"
            priceNote="Custom • 25GB+ per mailbox"
            ctaText="Contact Sales"
            href="#consult"
            bullets={[
              "Encryption & retention policies",
              "Priority support & monitoring",
              "Staff security training",
            ]}
          />
        </div>
      </Container>
    </section>
  );
}

function WhyChoose() {
  return (
    <section aria-labelledby="why-choose" className="border-t border-neutral-200">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          id="why-choose"
          eyebrow="Why Choose OmoolaEx"
          title="Built for Nigerian SMEs"
          subtitle="Affordable, secure, and supported by a team that understands local realities."
        />
        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "SME-Focused", text: "Practical solutions tailored to growth." },
            { title: "Affordable & Scalable", text: "Start small, expand easily." },
            { title: "Always Supported", text: "Helpful humans, when you need them." },
          ].map((item, i) => (
            <li
              key={i}
              className="rounded-2xl border border-neutral-200 p-5 text-center shadow-sm"
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section id="consult" aria-labelledby="cta" className="border-t border-neutral-200">
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 p-6 text-center shadow-sm sm:p-10">
          <h2 id="cta" className="text-2xl font-semibold sm:text-3xl">
            Ready to upgrade your business email?
          </h2>
          <p className="mt-3 text-sm text-neutral-700 sm:text-base">
            Book a free consultation. We’ll recommend the right stack—Google
            Workspace, Microsoft 365, Zoho, or managed cPanel—then set it up
            end-to-end.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="/bookings">
              Request a Free Consultation
            </PrimaryButton>
            <SecondaryButton href="/services">Explore More Services</SecondaryButton>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            No pressure. Clear pricing. Fast onboarding.
          </p>
        </div>
      </Container>
    </section>
  );
}

// ---------- Icons ----------
function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Envelope icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75Z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Device icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Users icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M16 14a4 4 0 1 1 8 0v1" transform="translate(-4 -4)" />
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Shield icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Cloud icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 18h9a4 4 0 1 0-1-7.874A5.5 5.5 0 1 0 7 18Z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Wrench icon"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 5a5 5 0 0 1-6.708 4.69L8.5 15.5l-3 3a2.121 2.121 0 1 1-3-3l3-3 5.81-5.792A5 5 0 1 1 21 5Z" />
    </svg>
  );
}

// ---------- Page ----------
export default function WebmailManagementPage() {
  return (
    <main className="bg-white text-neutral-900">
      <HeroSection />
      <WhyItMatters />
      <Packages />
      <WhyChoose />
      <CTASection />
    </main>
  );
}
