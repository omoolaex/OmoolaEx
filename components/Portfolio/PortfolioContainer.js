"use client";

import { useState } from "react";
import PortfolioFilter from "./PortfolioFilter";
import PortfolioGrid from "./PortfolioGrid";
import PortfolioModal from "./PortfolioModal";

export default function PortfolioContainer({ projects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
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
