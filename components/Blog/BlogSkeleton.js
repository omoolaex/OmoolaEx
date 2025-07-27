export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-lg h-64 w-full shadow-sm dark:bg-gray-300"
        >
          <div className="h-full w-full" />
        </div>
      ))}
    </div>
  )
}