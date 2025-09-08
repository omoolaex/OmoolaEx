// app/brand-management/page.jsx

import Script from "next/script";
import PageHero from "@/components/PageHero";
import PageViewTracker from "@/components/Analytics/PageViewTracker";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export const metadata = {
  title: "Brand Management Services | OmoolaEx",
  description:
    "Shape your brand to resonate, scale, and last. OmoolaEx helps individuals, startups, and businesses with strategy, identity, messaging, and rollout.",
  keywords: [
    "brand management",
    "branding services Nigeria",
    "OmoolaEx branding",
    "brand identity",
    "brand strategy",
  ],
  alternates: { canonical: `${siteUrl}/brand-management` },
  openGraph: {
    title: "Brand Management Services | OmoolaEx",
    description:
      "Shape your brand to resonate, scale, and last. OmoolaEx offers brand strategy, identity, messaging, and rollout services.",
    url: `${siteUrl}/brand-management`,
    siteName: "OmoolaEx",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/brand-management.jpg`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Brand Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Management Services | OmoolaEx",
    description:
      "Shape your brand to resonate, scale, and last with OmoolaEx branding services.",
    images: [`${siteUrl}/images/brand-management.jpg`],
    site: "@omoolaex",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Management Services",
  provider: {
    "@type": "Organization",
    name: "OmoolaEx",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
  description:
    "OmoolaEx helps businesses and individuals shape brand perception with strategy, identity, messaging, and rollout services.",
  serviceType: "Brand Management",
  areaServed: { "@type": "Place", name: "Nigeria" },
  url: `${siteUrl}/brand-management`,
};

export default function BrandManagementPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* ✅ Structured Data */}
      <Script
        id="structured-data-brand"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Pageview Tracker */}
      <PageViewTracker
        title="Brand Management Services | OmoolaEx"
        path="/brand-management"
        location={`${siteUrl}/brand-management`}
      />

      {/* 🚀 Hero Section */}
      <PageHero
        title="Shape a Brand That Resonates, Scales, and Lasts."
        subtitle="Your brand isn’t just a logo — it’s how the world perceives you. At OmoolaEx, we guide individuals, startups, and businesses to find clarity, define their essence, and build brands that grow with them."
        ctaText="Build My Brand Now"
        ctaLink="/contact"
      />

      {/* ❌ Problem + Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">❌ Most brands struggle to connect.</h2>
          <p className="mb-4 text-lg">
            Too many businesses settle for surface-level branding — a nice logo, some colors, a tagline. 
            But without strategy, clarity, and consistency, their brand gets lost in the noise.
          </p>
          <p className="mb-4 text-lg">
            Individuals feel invisible. Startups can’t scale their story. 
            Established businesses fade out or feel outdated.
          </p>
          <p className="mb-6 text-lg font-semibold">
            OmoolaEx changes that. We help you build a brand from the inside out — aligning strategy, identity, and messaging so your audience instantly gets you and remembers you.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark transition"
          >
            Let’s Build Your Brand Story
          </a>
        </div>
      </section>

      {/* 🎯 Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            🎯 Everything You Need to Build a Brand That Resonates
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            Branding isn’t just visuals. It’s strategy, identity, messaging, and experience, all working together.
            At OmoolaEx, we guide you through every step to ensure consistency, memorability, and scalability.
          </p>

          {/* Service Components */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Brand Strategy & Positioning",
                items: [
                  "Mission, vision, values",
                  "Audience & market research",
                  "Unique Value Proposition (UVP)",
                  "Messaging pillars",
                ],
              },
              {
                title: "Visual Identity Development",
                items: [
                  "Logo & identity systems",
                  "Typography & color strategy",
                  "Brand guidelines (playbook)",
                ],
              },
              {
                title: "Brand Messaging & Voice",
                items: [
                  "Tone of voice framework",
                  "Tagline & key messaging",
                  "Narrative & storytelling",
                ],
              },
              {
                title: "Brand Experience & Rollout",
                items: [
                  "Touchpoint mapping",
                  "Consistency frameworks",
                  "Launch/relaunch support",
                ],
              },
              {
                title: "PR & Reputation Management",
                items: [
                  "Strategic PR campaigns",
                  "Reputation monitoring",
                  "Media relations (optional)",
                ],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {service.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark transition"
            >
              Explore How We Build Your Brand
            </a>
          </div>
        </div>
      </section>

      {/* 💡 Pricing & Client Fit */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            💡 Flexible Tracks for Every Stage
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Personal Brand Build/Refresh",
                desc: "For individuals and professionals who want authentic positioning.",
              },
              {
                title: "Startup Brand Build",
                desc: "For founders and early-stage companies needing scalable branding.",
              },
              {
                title: "Business Brand Refresh/Scale",
                desc: "For SMEs & established brands looking to reframe or relaunch.",
              },
            ].map((track, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
              >
                <h3 className="text-xl font-semibold mb-4">{track.title}</h3>
                <p className="text-gray-600">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 Why Choose OmoolaEx */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">🌟 Why Choose OmoolaEx?</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>🤝 Guide & Partner — collaborative, not prescriptive.</li>
            <li>⚖️ Balanced — aspirational vision + practical execution.</li>
            <li>🚀 Future-proof — scalable and consistent branding systems.</li>
            <li>🔑 Foundational clarity — we build from essence, not surface design.</li>
          </ul>
        </div>
      </section>

      {/* 🚀 Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build a Brand That Lasts?
          </h2>
          <p className="mb-6 text-lg">
            Let’s shape a brand that resonates deeply with your audience and
            drives long-term growth.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-primary rounded-xl shadow-md hover:bg-gray-100 transition font-semibold"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </main>
  );
}
