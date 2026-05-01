import { cn } from "@/lib/utils";

interface SelectionCardProps {
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectionCard({ title, subtitle, selected, onClick }: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl border-2 text-start transition-all duration-300",
        selected ? "border-primary bg-primary/5 shadow-inner scale-[0.98]" : "border-border bg-background hover:border-primary/30 hover:shadow-md"
      )}
    >
      <h4 className={cn("font-bold text-lg mb-1", selected ? "text-primary" : "")}>{title}</h4>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </button>
  );
}
