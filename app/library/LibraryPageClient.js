"use client";

import { useState } from "react";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import { motion, AnimatePresence } from "framer-motion";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

export default function LibraryPageClient({ resources = [] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Lead Modal State
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadOrganization, setLeadOrganization] = useState("");
  const [leadRole, setLeadRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Founders", "Career", "Students"];
  const types = ["All", "Workbook", "Guide", "Template", "Checklist"];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title?.toLowerCase().includes(search.toLowerCase()) ||
      res.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" ? true : res.category === categoryFilter;
    const matchesType = typeFilter === "All" ? true : res.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "OmoolaEx Resource Library",
    url: `${siteUrl}/library`,
    description:
      "Access free and premium guides, templates, workbooks, and checklists for Founders, Career Builders, and Students in Nigeria.",
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/omoolaex-library.jpg`,
      },
    },
    hasPart: resources.map((res) => ({
      "@type": "CreativeWork",
      name: res.title,
      description: res.description,
      url: `${siteUrl}/library/${res.slug?.current || res._id}`,
    })),
  };

  const rssLink = `${siteUrl}/api/rss/resources`;

  const handleDownloadClick = (res) => {
    setSelectedResource(res);
    setLeadModalOpen(true);
    setSubmitted(false);
    setLeadName("");
    setLeadEmail("");
    setLeadOrganization("");
    setLeadRole("");
    setLoading(false);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !selectedResource?.file?.asset?.url) return;
    setLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          organization: leadOrganization,
          role: leadRole,
          resource: selectedResource.title,
          downloadUrl: selectedResource.file.asset.url,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        window.open(selectedResource.file.asset.url, "_blank");
      } else {
        alert(data.error || "Failed to submit lead. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-x-hidden relative mb-8">
      {/* Structured Data */}
      <Script
        id="structured-data-library"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Analytics */}
      <PageViewTracker
        title="OmoolaEx Resource Library | Guides, Templates & Workbooks"
        path="/library"
        location={`${siteUrl}/library`}
      />

      {/* Page Hero */}
      <PageHero />

      {/* Page Header */}
      <section className="text-center mb-4 mt-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Resource Library</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-2">
          Explore guides, workbooks, templates, and more for Founders, Career
          Builders, and Students.
        </p>
        <a
          href={rssLink}
          className="text-blue-600 hover:underline text-sm md:text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe via RSS
        </a>
      </section>

      {/* Filters */}
      <section className="flex flex-col sm:flex-row justify-center gap-4 mb-8 mt-4 px-4">
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full sm:w-1/3 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full sm:w-auto px-4 py-2 border rounded-full"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="w-full sm:w-auto px-4 py-2 border rounded-full"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </section>

      {/* Resources Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
        {filteredResources.map((res) => (
          <div
            key={res._id}
            className="border p-4 sm:p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="mb-4 h-32 flex items-center justify-center bg-gray-100 rounded-xl">
              <span className="text-gray-400 text-6xl">📄</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{res.title}</h2>
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              {/* Display first 150 chars as teaser */}
              {res.description?.substring(0, 150)}...
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDownloadClick(res)}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition cursor-pointer"
              >
                Access Full Resource
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {leadModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLeadModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full sm:w-11/12 md:w-1/2 p-8 shadow-xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Download Resource
              </h3>
              {submitted ? (
                <p className="text-green-600 font-semibold text-center">
                  Thank you! Your download should start automatically. Check your email for the link as well.
                </p>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={leadOrganization}
                    onChange={(e) => setLeadOrganization(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Role / Position"
                    className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={leadRole}
                    onChange={(e) => setLeadRole(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`px-5 py-3 text-white rounded-full text-lg transition ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit & Download"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
