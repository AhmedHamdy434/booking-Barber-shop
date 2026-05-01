import { useTranslations } from "next-intl";
import { Clock, CheckCircle, Loader2 } from "lucide-react";

interface DateTimeStepProps {
  date: string;
  startTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  isLoadingSlots: boolean;
  availableSlots: string[];
  busySlots: { start_time: string, end_time: string, service_name: string }[];
  workingHours: { start: string, end: string } | null;
}

export function DateTimeStep({
  date,
  startTime,
  onDateChange,
  onTimeChange,
  isLoadingSlots,
  availableSlots,
  busySlots,
  workingHours
}: DateTimeStepProps) {
  const t = useTranslations("Booking");

  return (
    <div className="space-y-10">
      {/* Date Picker */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {t("selectDate")}
        </label>
        <input 
          type="date" 
          min={new Date().toISOString().split('T')[0]}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full max-w-sm p-4 rounded-xl border bg-background text-lg font-bold focus:ring-2 focus:ring-primary outline-none transition-all text-center"
          aria-label={t("selectDate")}
        />
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        {/* Manual Time Input */}
        <div className="flex flex-col items-center gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/20">
          <label className="text-sm font-bold uppercase tracking-widest text-primary">
            {t("manualTime")}
          </label>
          <input 
            type="time" 
            value={startTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="text-3xl font-black bg-transparent border-b-2 border-primary text-center outline-none focus:border-primary-foreground transition-colors p-2"
          />
        </div>

        {isLoadingSlots ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">{t("findingSlots")}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Available Slots Header with Working Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {t("availableSlots")}
                </h4>
                {workingHours && (
                  <div className="flex items-center gap-3 bg-primary/10 text-primary px-5 py-2.5 rounded-2xl border border-primary/20 shadow-sm">
                    <Clock className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-70 leading-none mb-1">{t("shiftHours")}</span>
                      <span className="text-sm font-black tracking-tight">{workingHours.start} — {workingHours.end}</span>
                    </div>
                  </div>
                )}
              </div>
              {availableSlots.length === 0 && (
                <p className="text-sm text-muted-foreground italic">{t("noSlots")}</p>
              )}
            </div>

            {/* Busy Slots */}
            {busySlots.length > 0 && (
              <div className="space-y-4 border-t border-border pt-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-destructive" />
                  {t("busySlots")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {busySlots.map((slot, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border opacity-60"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{slot.service_name}</span>
                        <span className="text-[10px] text-muted-foreground">{t("alreadyBooked")}</span>
                      </div>
                      <span className="font-mono text-xs font-bold">
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
