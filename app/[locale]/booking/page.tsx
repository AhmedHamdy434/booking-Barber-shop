import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Suspense } from "react";
import { BookingWizardSkeleton } from "@/components/ui/skeletons";
import { routing } from "@/i18n/routing";

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
  return { title: t("booking") };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Booking");

  return (
    <div className="flex-1 py-12 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {t.rich("title", {
            span: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* <Suspense fallback={<BookingWizardSkeleton />}> */}
        <BookingWizard locale={locale} />
      {/* </Suspense> */}
    </div>
  );
}
