import { useTranslations } from "next-intl";
import { Service } from "@/types";
import { SelectionCard } from "./selection-card";

interface ServiceStepProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ServiceStep({ services, selectedId, onSelect }: ServiceStepProps) {
  const t = useTranslations("Services");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map(s => (
        <SelectionCard 
          key={s.id}
          selected={selectedId === s.id}
          onClick={() => onSelect(s.id)}
          title={s.name}
          subtitle={`${s.duration} ${t("duration")} • $${s.price}`}
        />
      ))}
    </div>
  );
}
