import { Barber } from "@/types";
import { SelectionCard } from "./selection-card";
import { useTranslations } from "next-intl";

interface BarberStepProps {
  barbers: Barber[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BarberStep({ barbers, selectedId, onSelect }: BarberStepProps) {
  const t = useTranslations("Booking");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {barbers.map(b => (
        <SelectionCard 
          key={b.id}
          selected={selectedId === b.id}
          onClick={() => onSelect(b.id)}
          title={b.name}
          subtitle={b.bio || t("expertBarber")}
        />
      ))}
    </div>
  );
}
