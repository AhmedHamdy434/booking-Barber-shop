import { getActiveServices, getActiveBarbers } from "@/lib/queries";
import { BookingWizardForm } from "./booking-wizard-form";

export async function BookingWizard({ locale }: { locale: string }) {
  // Parallel data fetching on the server
  const [services, barbers] = await Promise.all([
    getActiveServices(),
    getActiveBarbers()
  ]);

  return <BookingWizardForm services={services} barbers={barbers} locale={locale} />;
}
