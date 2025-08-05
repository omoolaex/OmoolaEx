'use client';

import Image from 'next/image';

export default function PortfolioCard({ project, onSelect }) {
  // Extract short excerpt from first block
  const getExcerpt = (overview) => {
    if (!overview || overview.length === 0) return '';
    const block = overview.find(b => b._type === 'block');
    return block?.children?.[0]?.text?.slice(0, 80) + '...';
  };

  return (
    <div
      className="cursor-pointer group overflow-hidden rounded-2xl shadow hover:shadow-xl transition"
      onClick={() => onSelect(project)}
    >
      {/* Featured Image */}
      <div className="relative h-52 w-full">
        {project.featuredImage && (
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{getExcerpt(project.projectOverview)}</p>
      </div>
    </div>
  );
}
