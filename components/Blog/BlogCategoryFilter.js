export default function BlogCategoryFilter({ categories, selectedCategoryId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => {
        const isSelected = selectedCategoryId === category._id
        return (
          <button
            key={category._id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(category._id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {category.title}
          </button>
        )
      })}
    </div>
  )
}