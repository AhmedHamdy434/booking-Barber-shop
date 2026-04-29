import { Skeleton } from "@/components/ui/skeleton";

export default function BookingLoading() {
  return (
    <div className="flex-1 py-12 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 text-center mb-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
        <div className="flex justify-between mb-12">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="w-10 h-10 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    </div>
  );
}
