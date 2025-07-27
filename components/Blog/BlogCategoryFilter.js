'use client'

export default function BlogCategoryFilter({ categories, selectedCategoryId, onSelect }) {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded ${
          selectedCategoryId === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        All
      </button>

      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded ${
            selectedCategoryId === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}