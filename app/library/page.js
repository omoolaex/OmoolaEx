import LibraryPageClient from "./LibraryPageClient";
import { client } from "@/sanity/client";

export const metadata = {
  title: "Resource Library | OmoolaEx | Guides, Templates & Workbooks",
  description:
    "Explore our resource library with workbooks, templates, guides, and checklists for Founders, Career Builders, and Students in Nigeria.",
};

export default async function LibraryPageServer() {
  let resources = [];

  try {
    resources = await client.fetch(`
      *[_type == "resource" && defined(title)]{
        _id,
        title,
        description,
        category,
        type,
        file{
          asset->{url}
        },
        slug
      }
    `);

    console.log("Fetched resources:", resources);
  } catch (err) {
    console.error("Failed to fetch resources:", err);
  }

  return <LibraryPageClient resources={resources} />;
}
