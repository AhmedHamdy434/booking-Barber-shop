import { getTranslations } from "next-intl/server";
import { getActiveServices } from "@/lib/queries";
import { Clock, Scissors } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function ServicesList() {
  const t = await getTranslations("Services");

  return (
    <>
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight border-l-4 border-primary pl-6">
          {t("listTitle")}
        </h2>
      </div>
      <Suspense fallback={<ServicesGridSkeleton />}>
        <ServicesGrid />
      </Suspense>
    </>
  );
}

async function ServicesGrid() {
  const services = await getActiveServices();
  const t = await getTranslations("Services");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="group bg-background border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{service.name}</h3>
            <p className="text-muted-foreground mb-6 line-clamp-2">
              {service.description || "Expert grooming service tailored to your personal style and preferences."}
            </p>
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                {service.duration} {t("duration")}
              </div>
              <div className="text-2xl font-black text-primary">
                ${service.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-64 rounded-3xl" />
      ))}
    </div>
  );
}
