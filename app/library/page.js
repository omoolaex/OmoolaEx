import LibraryPageClient from "./LibraryPageClient";
import { client } from "@/sanity/client";

// ✅ ISR: Regenerate the page every hour (3600 seconds)
export const revalidate = 3600;

// ✅ Metadata for SEO, social sharing, and canonical
export async function generateMetadata() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  return {
    title: "Library | Free Resources, Guides & IT Insights | OmoolaEx Nigeria",
    description:
      "Access OmoolaEx’s free library of resources including eBooks, guides, templates, and IT insights to help startups and SMEs grow in Nigeria.",
    keywords: [
      "OmoolaEx Library",
      "Free IT Resources",
      "Business Guides Nigeria",
      "Startup Templates",
      "IT Consulting eBooks",
      "Web Development Guides",
      "Branding Resources",
      "Cybersecurity Insights",
      "Digital Strategy Nigeria",
    ],
    alternates: { canonical: `${siteUrl}/library` },
    openGraph: {
      title: "OmoolaEx Library | Free IT & Business Resources",
      description:
        "Download free eBooks, templates, and guides from OmoolaEx to boost your web design, IT consulting, branding, and digital growth strategies.",
      url: `${siteUrl}/library`,
      siteName: "OmoolaEx",
      images: [
        {
          url: `${siteUrl}/images/omoolaex.jpg`,
          width: 1200,
          height: 630,
          alt: "OmoolaEx Library | Free Business Resources",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "OmoolaEx Library | Free IT & Business Resources",
      description:
        "Discover free resources and guides from OmoolaEx on IT consulting, branding, and web development for startups in Lagos, Nigeria.",
      images: [`${siteUrl}/images/omoolaex.jpg`],
      site: "@omoolaex",
    },
  };
}

// ✅ Server component fetching resources from Sanity
export default async function LibraryPageServer() {
  let resources = [];

  try {
    resources = await client.fetch(`
      *[_type == "resource" && defined(title)] | order(_createdAt desc) {
        _id,
        title,
        description,
        category,
        type,
        "file": file.asset->,
        slug
      }
    `);

    // Ensure every resource has a fileUrl for download/preview
    resources = resources.map((res) => ({
      ...res,
      fileUrl: res.file?.url || res.fileUrl || null,
    }));

    console.log("Fetched resources:", resources);
  } catch (err) {
    console.error("Failed to fetch resources:", err);
  }

  return <LibraryPageClient resources={resources} />;
}
