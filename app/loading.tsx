export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Hero skeleton */}
      <div className="h-[60vh] skeleton rounded-3xl mb-12" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="skeleton aspect-square rounded-2xl" />
            <div className="skeleton h-4 rounded-lg w-3/4" />
            <div className="skeleton h-4 rounded-lg w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
