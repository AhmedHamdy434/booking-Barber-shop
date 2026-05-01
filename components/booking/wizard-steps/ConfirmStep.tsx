import { useTranslations } from "next-intl";
import { Service, Barber } from "@/types";

interface ConfirmStepProps {
  selection: {
    serviceId: string;
    barberId: string;
    date: string;
    startTime: string;
  };
  services: Service[];
  barbers: Barber[];
  message?: string;
}

export function ConfirmStep({ selection, services, barbers, message }: ConfirmStepProps) {
  const t = useTranslations("Booking");

  return (
    <div className="space-y-6 bg-primary/5 p-6 rounded-2xl border border-primary/10">
      <div className="grid grid-cols-2 gap-4">
        <SummaryItem 
          label={t("summary.service")} 
          value={services.find(s => s.id === selection.serviceId)?.name || ""} 
        />
        <SummaryItem 
          label={t("summary.barber")} 
          value={barbers.find(b => b.id === selection.barberId)?.name || ""} 
        />
        <SummaryItem 
          label={t("summary.date")} 
          value={selection.date} 
        />
        <SummaryItem 
          label={t("summary.time")} 
          value={selection.startTime} 
        />
      </div>
      {message && (
        <p className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-bold">
          {message}
        </p>
      )}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</span>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}
