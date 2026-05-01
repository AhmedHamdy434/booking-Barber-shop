import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { CoreValues } from "@/components/about/CoreValues";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ServicesList } from "@/components/about/ServicesList";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("about") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex-1">
      <AboutHero />
      <CoreValues />
      <OurStory />
        <section className="py-24">
        <div className="container mx-auto px-4">
          <ServicesList />
        </div>
      </section>
      <TeamGrid />
    </div>
  );
}
