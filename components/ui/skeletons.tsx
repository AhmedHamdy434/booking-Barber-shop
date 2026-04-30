import { Card, CardContent, CardHeader, CardFooter } from "./card";
import { Skeleton } from "./skeleton";

export function BookingWizardSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Stepper Skeleton */}
      <div className="flex justify-between mb-12 relative">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-16 h-3 hidden sm:block" />
          </div>
        ))}
      </div>

      <Card className="glass border-white/20">
        <CardContent className="pt-8 min-h-[300px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-2xl border-2 border-border/50">
                <Skeleton className="w-24 h-5 mb-2" />
                <Skeleton className="w-32 h-4" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <Skeleton className="w-20 h-9 rounded-md" />
          <Skeleton className="w-24 h-9 rounded-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

export function BookingsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="overflow-hidden border-l-4 border-l-muted">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-16 h-3" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-32 h-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-40 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-28 h-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TeamGridSkeleton() {

  return (
 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-4/5 relative rounded-3xl overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Skeleton className="h-6 w-32 bg-white/20" />
                <Skeleton className="h-4 w-24 bg-primary/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}