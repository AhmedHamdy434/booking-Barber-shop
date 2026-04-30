import { getActiveServices, getActiveBarbers } from "@/lib/queries";
import { BookingWizardForm } from "./booking-wizard-form";
import { Suspense } from "react";
import { BookingWizardSkeleton } from "../ui/skeletons";

export async function BookingWizard({ locale }: { locale: string }) {

  const [services, barbers] = await Promise.all([
    getActiveServices(),
    getActiveBarbers()
  ]);

  return <Suspense fallback={<BookingWizardSkeleton />}>
    <BookingWizardForm services={services} barbers={barbers} locale={locale} />
  </Suspense>;
}
