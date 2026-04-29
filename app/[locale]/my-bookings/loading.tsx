import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function MyBookingsLoading() {
  return (
    <div className="flex-1 py-12 md:py-20 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-7 w-48 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter className="bg-secondary/20 pt-4">
                <Skeleton className="h-8 w-24 ml-auto" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
