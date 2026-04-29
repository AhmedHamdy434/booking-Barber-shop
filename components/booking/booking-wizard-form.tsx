"use client";

import { useState, useEffect, useTransition, useActionState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Scissors, User, Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDaySchedule, createBooking } from "@/actions/booking";
import { MotionDiv } from "../shared/motion-elements";
import { Service, Barber } from "@/types";

type Step = 'service' | 'barber' | 'date' | 'time' | 'confirm';

interface BookingWizardFormProps {
  services: Service[];
  barbers: Barber[];
  locale: string;
}

export function BookingWizardForm({ services, barbers, locale }: BookingWizardFormProps) {
  const t = useTranslations("Booking");
  const [step, setStep] = useState<Step>('service');
  const [selection, setSelection] = useState({
    serviceId: '',
    barberId: barbers[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [busySlots, setBusySlots] = useState<{ start_time: string, end_time: string, service_name: string }[]>([]);
  const [isLoadingSlots, startLoadingSlots] = useTransition();
  const [state, action, isPending] = useActionState(createBooking, undefined);

  useEffect(() => {
    if (selection.barberId && selection.date && selection.serviceId && step === 'time') {
      startLoadingSlots(async () => {
        const schedule = await getDaySchedule(selection.barberId, selection.date, selection.serviceId);
        setAvailableSlots(schedule.available);
        setBusySlots(schedule.busy);
      });
    }
  }, [selection.barberId, selection.date, selection.serviceId, step]);

  const nextStep = () => {
    if (step === 'service') setStep('barber');
    else if (step === 'barber') setStep('date');
    else if (step === 'date') setStep('time');
    else if (step === 'time') setStep('confirm');
  };

  const prevStep = () => {
    if (step === 'barber') setStep('service');
    else if (step === 'date') setStep('barber');
    else if (step === 'time') setStep('date');
    else if (step === 'confirm') setStep('time');
  };

  const isNextDisabled = () => {
    if (step === 'service') return !selection.serviceId;
    if (step === 'barber') return !selection.barberId;
    if (step === 'date') return !selection.date;
    if (step === 'time') return !selection.startTime;
    return false;
  };

  const steps: { id: Step; icon: LucideIcon; label: string }[] = [
    { id: 'service', icon: Scissors, label: t("selectService") },
    { id: 'barber', icon: User, label: t("selectBarber") },
    { id: 'date', icon: Calendar, label: t("selectDate") },
    { id: 'time', icon: Clock, label: t("selectTime") },
    { id: 'confirm', icon: CheckCircle, label: t("confirm") },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = steps.findIndex(x => x.id === step) > idx;

          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 bg-background",
                  isActive ? "border-primary text-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.3)]" : 
                  isCompleted ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={cn("text-[10px] sm:text-xs font-bold uppercase tracking-tighter sm:tracking-widest hidden sm:block", isActive ? "text-primary" : "text-muted-foreground")}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <Card className="glass shadow-xl border-white/20">
        <CardContent className="pt-8">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-[300px]"
            >
              {step === 'service' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map(s => (
                    <SelectionCard 
                      key={s.id}
                      selected={selection.serviceId === s.id}
                      onClick={() => {
                        setSelection({ ...selection, serviceId: s.id });
                        setTimeout(nextStep, 200);
                      }}
                      title={s.name}
                      subtitle={`${s.duration} min • $${s.price}`}
                    />
                  ))}
                </div>
              )}

              {step === 'barber' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {barbers.map(b => (
                    <SelectionCard 
                      key={b.id}
                      selected={selection.barberId === b.id}
                      onClick={() => {
                        setSelection({ ...selection, barberId: b.id });
                        setTimeout(nextStep, 200);
                      }}
                      title={b.name}
                      subtitle={b.specialty || t("expertBarber")}
                    />
                  ))}
                </div>
              )}

              {step === 'date' && (
                <div className="flex flex-col items-center">
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={selection.date}
                    onChange={(e) => {
                      setSelection({ ...selection, date: e.target.value });
                      setTimeout(nextStep, 300);
                    }}
                    className="w-full max-w-sm p-4 rounded-xl border bg-background text-lg font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                    aria-label={t("selectDate")}
                  />
                </div>
              )}

              {step === 'time' && (
                <div className="space-y-8">
                  {/* Manual Time Input */}
                  <div className="flex flex-col items-center gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/20">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary">
                      {t("selectTime")} (Manual)
                    </label>
                    <input 
                      type="time" 
                      value={selection.startTime}
                      onChange={(e) => setSelection({ ...selection, startTime: e.target.value })}
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
                      {/* Available Slots */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Available Slots
                        </h4>
                        {availableSlots.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {availableSlots.map(time => (
                              <button
                                key={time}
                                onClick={() => setSelection({ ...selection, startTime: time })}
                                className={cn(
                                  "py-3 px-2 rounded-lg border text-sm font-bold transition-all",
                                  selection.startTime === time ? "bg-primary text-white border-primary shadow-lg scale-105" : "bg-background hover:border-primary/50"
                                )}
                                aria-label={time}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">{t("noSlots")}</p>
                        )}
                      </div>

                      {/* Busy Slots */}
                      {busySlots.length > 0 && (
                        <div className="space-y-4 border-t border-border pt-8">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4 text-destructive" />
                            Booked Slots (Busy)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {busySlots.map((slot, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border opacity-60"
                              >
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold">{slot.service_name}</span>
                                  <span className="text-[10px] text-muted-foreground">Already Booked</span>
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
              )}

              {step === 'confirm' && (
                <div className="space-y-6 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <div className="grid grid-cols-2 gap-4">
                    <SummaryItem label={t("summary.service")} value={services.find(s => s.id === selection.serviceId)?.name || ""} />
                    <SummaryItem label={t("summary.barber")} value={barbers.find(b => b.id === selection.barberId)?.name || ""} />
                    <SummaryItem label={t("summary.date")} value={selection.date} />
                    <SummaryItem label={t("summary.time")} value={selection.startTime} />
                  </div>
                  {state?.message && <p className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg text-center font-bold">{state.message}</p>}
                </div>
              )}
            </MotionDiv>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <Button variant="ghost" onClick={prevStep} disabled={step === 'service' || isPending} aria-label={t("back")}>
            <ChevronLeft className={cn("w-4 h-4 mr-2", locale === 'ar' && "rotate-180")} />
            {t("back")}
          </Button>
          
          {step === 'confirm' ? (
            <form action={action}>
              <input type="hidden" name="serviceId" value={selection.serviceId} />
              <input type="hidden" name="barberId" value={selection.barberId} />
              <input type="hidden" name="date" value={selection.date} />
              <input type="hidden" name="startTime" value={selection.startTime} />
              <input type="hidden" name="locale" value={locale} />
              <Button variant="gold" size="lg" className="px-10 rounded-full" disabled={isPending} aria-label={t("bookNow")}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("bookNow")}
              </Button>
            </form>
          ) : (
            <Button variant="default" onClick={nextStep} disabled={isNextDisabled()} aria-label={t("next")}>
              {t("next")}
              <ChevronRight className={cn("w-4 h-4 ml-2", locale === 'ar' && "rotate-180")} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function SelectionCard({ title, subtitle, selected, onClick }: { title: string, subtitle: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl border-2 text-left transition-all duration-300",
        selected ? "border-primary bg-primary/5 shadow-inner scale-[0.98]" : "border-border bg-background hover:border-primary/30 hover:shadow-md"
      )}
    >
      <h4 className={cn("font-bold text-lg mb-1", selected ? "text-primary" : "")}>{title}</h4>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </button>
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
