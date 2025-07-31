export default function BlogPagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Previous Page"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  )
}