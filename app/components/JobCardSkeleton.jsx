export function JobCardSkeleton() {
  return (
    <div className="shadow animate-pulse rounded-xl w-full h-36 p-6">
      <div className="w-3/4 max-w-xl h-10 rounded-md animate-pulse bg-slate-100 mb-7"></div>
      <div className="w-2/4 max-w-lg h-6 rounded-md animate-pulse bg-slate-100"></div>
    </div>
  );
}
