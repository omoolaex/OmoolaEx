'use client'
export default function BlogPagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="mt-10 flex gap-2 justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 border rounded ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}