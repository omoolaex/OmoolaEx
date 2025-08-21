'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) =>
  builder.image(source).width(600).height(400).fit('crop').auto('format').url();

export default function HomePortfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "portfolio"] | order(_createdAt desc)[0...20]{
        title,
        slug,
        featuredImage,
        liveWebsite,
        "category": category->title
      }`;

      const data = await client.fetch(query);
      setPortfolioItems(data);

      // Extract unique categories
      const uniqueCategories = [
        'all',
        ...new Set(data.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
      setLoading(false);
    }

    fetchData();
  }, []);

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  // ✅ Always show only 3 items for grid
  const displayItems = filteredItems.slice(0, 3);

  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] bg-blue-100 rounded-full blur-[80px] sm:blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-40px] right-[-50px] w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-yellow-100 rounded-full blur-[70px] sm:blur-[90px] opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
          >
            Recent Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
          >
            See how we’ve helped clients achieve digital excellence.
          </motion.p>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm sm:text-base rounded-full border transition ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 hover:border-blue-400 border-gray-200'
                }`}
              >
                {cat === 'all'
                  ? 'All'
                  : cat.replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-52 sm:h-56 md:h-64 w-full rounded-xl bg-gray-200 animate-pulse"
              />
            ))}

          {!loading &&
            displayItems.map((item, index) => (
              <motion.a
                key={item.slug?.current || index}
                href={item.liveWebsite || '#'}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 md:h-64 w-full">
                  {item.featuredImage && (
                    <Image
                      src={urlFor(item.featuredImage)}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL="/images/omoolaex.jpg"
                    />
                  )}
                </div>

                {/* Text Block */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                    {item.category || 'Click to view project'}
                  </p>
                </div>
              </motion.a>
            ))}

          {/* Optional placeholder for consistent 3-grid layout */}
          {!loading &&
            displayItems.length < 3 &&
            [...Array(3 - displayItems.length)].map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="hidden lg:block rounded-xl bg-gray-100"
              />
            ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-14">
          <a
            href="/portfolio"
            className="inline-block px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition text-sm sm:text-base"
          >
            View Full Portfolio →
          </a>
        </div>
      </div>
    </section>
  );
}
