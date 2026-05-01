"use client";

import { useState, useEffect, useTransition, useActionState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Scissors,
  User,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDaySchedule, createBooking } from "@/actions/booking";
import { MotionDiv } from "../shared/motion-elements";
import { Service, Barber } from "@/types";
import { toast } from "sonner";

// Wizard Steps
import { ServiceStep } from "./wizard-steps/ServiceStep";
import { BarberStep } from "./wizard-steps/BarberStep";
import { DateTimeStep } from "./wizard-steps/DateTimeStep";
import { ConfirmStep } from "./wizard-steps/ConfirmStep";

type Step = "service" | "barber" | "datetime" | "confirm";

interface BookingWizardFormProps {
  services: Service[];
  barbers: Barber[];
  locale: string;
}

export function BookingWizardForm({
  services,
  barbers,
  locale,
}: BookingWizardFormProps) {
  const t = useTranslations("Booking");
  const router = useRouter();
  const [step, setStep] = useState<Step>("service");
  const [selection, setSelection] = useState({
    serviceId: "",
    barberId: barbers[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [busySlots, setBusySlots] = useState<
    { start_time: string; end_time: string; service_name: string }[]
  >([]);
  const [workingHours, setWorkingHours] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [isLoadingSlots, startLoadingSlots] = useTransition();
  const [state, action, isPending] = useActionState(createBooking, undefined);

  useEffect(() => {
    if (state?.success) {
      toast.success(t("success"), {
        description: t("successDesc"),
      });
      router.push(`/${locale}/my-bookings`);
    }
  }, [state, t, locale, router]);

  useEffect(() => {
    if (
      selection.barberId &&
      selection.date &&
      selection.serviceId &&
      step === "datetime"
    ) {
      startLoadingSlots(async () => {
        const schedule = await getDaySchedule(
          selection.barberId,
          selection.date,
          selection.serviceId,
        );
        setAvailableSlots(schedule.available);
        setBusySlots(schedule.busy);
        setWorkingHours(schedule.workingHours || null);
      });
    }
  }, [selection.barberId, selection.date, selection.serviceId, step]);

  const nextStep = () => {
    if (step === "service") setStep("barber");
    else if (step === "barber") setStep("datetime");
    else if (step === "datetime") setStep("confirm");
  };

  const prevStep = () => {
    if (step === "barber") setStep("service");
    else if (step === "datetime") setStep("barber");
    else if (step === "confirm") setStep("datetime");
  };

  const isNextDisabled = () => {
    if (step === "service") return !selection.serviceId;
    if (step === "barber") return !selection.barberId;
    if (step === "datetime") return !selection.date || !selection.startTime;
    return false;
  };

  const steps: { id: Step; icon: LucideIcon; label: string }[] = [
    { id: "service", icon: Scissors, label: t("selectService") },
    { id: "barber", icon: User, label: t("selectBarber") },
    {
      id: "datetime",
      icon: Calendar,
      label: `${t("selectDate")} & ${t("selectTime")}`,
    },
    { id: "confirm", icon: CheckCircle, label: t("confirm") },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = steps.findIndex((x) => x.id === step) > idx;

          return (
            <div
              key={s.id}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 bg-background",
                  isActive
                    ? "border-primary text-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                    : isCompleted
                      ? "border-primary bg-primary text-white"
                      : "border-border text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-bold uppercase tracking-tighter sm:tracking-widest hidden sm:block",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
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
              {step === "service" && (
                <ServiceStep
                  services={services}
                  selectedId={selection.serviceId}
                  onSelect={(id) => {
                    setSelection({ ...selection, serviceId: id });
                    setTimeout(nextStep, 200);
                  }}
                />
              )}

              {step === "barber" && (
                <BarberStep
                  barbers={barbers}
                  selectedId={selection.barberId}
                  onSelect={(id) => {
                    setSelection({ ...selection, barberId: id });
                    setTimeout(nextStep, 200);
                  }}
                />
              )}

              {step === "datetime" && (
                <DateTimeStep
                  date={selection.date}
                  startTime={selection.startTime}
                  onDateChange={(date) => setSelection({ ...selection, date })}
                  onTimeChange={(time) =>
                    setSelection({ ...selection, startTime: time })
                  }
                  isLoadingSlots={isLoadingSlots}
                  availableSlots={availableSlots}
                  busySlots={busySlots}
                  workingHours={workingHours}
                />
              )}

              {step === "confirm" && (
                <ConfirmStep
                  selection={selection}
                  services={services}
                  barbers={barbers}
                  message={state?.message}
                />
              )}
            </MotionDiv>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === "service" || isPending}
            aria-label={t("back")}
          >
            <ChevronLeft
              className={cn("w-4 h-4 mr-2", locale === "ar" && "rotate-180")}
            />
            {t("back")}
          </Button>

          {step === "confirm" ? (
            <form action={action}>
              <input
                type="hidden"
                name="serviceId"
                value={selection.serviceId}
              />
              <input type="hidden" name="barberId" value={selection.barberId} />
              <input type="hidden" name="date" value={selection.date} />
              <input
                type="hidden"
                name="startTime"
                value={selection.startTime}
              />
              <input type="hidden" name="locale" value={locale} />
              <Button
                variant="gold"
                size="lg"
                className="px-10 rounded-full"
                disabled={isPending}
                aria-label={t("bookNow")}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("bookNow")}
              </Button>
            </form>
          ) : (
            <Button
              variant="default"
              onClick={nextStep}
              disabled={isNextDisabled()}
              aria-label={t("next")}
            >
              {t("next")}
              <ChevronRight
                className={cn("w-4 h-4 ml-2", locale === "ar" && "rotate-180")}
              />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
