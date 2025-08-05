'use client';

export default function PortfolioFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {/* All Button */}
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        All
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelectCategory(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === cat.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
