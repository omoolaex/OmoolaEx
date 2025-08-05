'use client';

import PortfolioCard from './PortfolioCard';

export default function PortfolioGrid({ projects, onSelectProject }) {
  if (!projects || projects.length === 0) {
    return <p className="text-center text-gray-500 py-10">No projects found in this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <PortfolioCard
          key={project._id}
          project={project}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}