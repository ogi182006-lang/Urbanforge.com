export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass rounded-2xl overflow-hidden ${className}`}
      role="status"
      aria-label="Loading product"
    >
      <div className="skeleton h-56 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBento() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <SkeletonCard className="col-span-2 row-span-2" />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
