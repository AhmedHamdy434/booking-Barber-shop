import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingsList } from "@/components/bookings/bookings-list";
import { Suspense } from "react";
import { BookingsListSkeleton } from "@/components/ui/skeletons";
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
  return { title: t("myBookings") };
}

export default async function MyBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("MyBookings");

  return (
    <div className="flex-1 py-12 md:py-20 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {t.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <Suspense fallback={<BookingsListSkeleton />}>
          <BookingsList locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
