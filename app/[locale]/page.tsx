import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ServicesList } from "@/components/about/ServicesList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("title") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-col flex min-h-screen">
      <Hero locale={locale} />
      <Features />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ServicesList />
        </div>
      </section>
      <TeamGrid />
    </div>
  );
}
