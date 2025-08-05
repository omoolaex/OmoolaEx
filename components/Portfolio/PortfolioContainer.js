'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/client';
import PortfolioFilter from './PortfolioFilter';
import PortfolioGrid from './PortfolioGrid';
import PortfolioModal from './PortfolioModal';

export default function PortfolioContainer() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [projectData, categoryData] = await Promise.all([
        client.fetch(`*[_type == "portfolio"] | order(_createdAt desc){
          _id,
          title,
          "slug": slug.current,
          "featuredImage": featuredImage.asset->url,
          projectOverview,
          category->{
            _id,
            title,
            "slug": slug.current
          },
          projectSnapshots[]{ asset->{url} },
          keyFeatures,
          challenges,
          ourSolution,
          impactResults,
          techStack,
          liveWebsite
        }`),
        client.fetch(`*[_type == "portfolioCategory"] | order(title asc){
          _id,
          title,
          "slug": slug.current
        }`)
      ]);

      setProjects(projectData);
      setCategories(categoryData);
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category?.slug === selectedCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Filter */}
        <PortfolioFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Portfolio Grid */}
        <PortfolioGrid
          projects={filteredProjects}
          onSelectProject={setSelectedProject}
        />

        {/* Modal */}
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
