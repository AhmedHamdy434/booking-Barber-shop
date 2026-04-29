import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceIntro } from "@/components/services/ServiceIntro";
import { ServicesList } from "@/components/services/ServicesList";
import { FeaturedPackages } from "@/components/services/FeaturedPackages";
import { ServicesCTA } from "@/components/services/ServicesCTA";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("services") };
}

function ServicesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-64 rounded-3xl" />
      ))}
    </div>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-1">
      <ServiceIntro />
      
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesList />
          </Suspense>
        </div>
      </section>

      <FeaturedPackages />
      <ServicesCTA />
    </div>
  );
}
