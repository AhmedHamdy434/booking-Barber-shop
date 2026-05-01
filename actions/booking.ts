"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateSlots } from "@/lib/core/slots";
import { getBarberAvailability, getExistingBookings } from "@/lib/queries";

const bookingSchema = z.object({
  serviceId: z.string().uuid(),
  barberId: z.string().uuid(),
  date: z.string(), // "YYYY-MM-DD"
  startTime: z.string(), // "HH:mm"
  locale: z.string().optional().default("en"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBooking(prevState: any, formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const barberId = formData.get("barberId") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const locale = (formData.get("locale") as string) || "en";

  const validatedFields = bookingSchema.safeParse({
    serviceId,
    barberId,
    date,
    startTime,
    locale,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "You must be logged in to book." };
  }

  // 1. Get service duration
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("duration")
    .eq("id", serviceId)
    .single();

  if (serviceError || !service) {
    return { message: "Service not found." };
  }

  // 2. Calculate end time
  // const [hours, minutes] = startTime.split(":").map(Number);
  // const startTotalMinutes = hours * 60 + minutes;
  // const endTotalMinutes = startTotalMinutes + service.duration;

  // const endHours = Math.floor(endTotalMinutes / 60);
  // const endMins = endTotalMinutes % 60;
  // const endTime = `${endHours.toString().padStart(2, "0")}:${endMins.toString().padStart(2, "0")}`;

  // 3. Create booking
  const { error: bookingError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      service_id: serviceId,
      barber_id: barberId,
      date: date,
      time: startTime,
      status: 'pending'
    });

  if (bookingError) {
    if (bookingError.message.includes("overlaps")) {
      return {
        message:
          locale === "ar"
            ? "هذا الوقت محجوز بالفعل"
            : "This time slot is already booked.",
      };
    }
    return { message: bookingError.message };
  }

  revalidatePath(`/${locale}/my-bookings`);
  return { success: true };
}



export async function getDaySchedule(
  barberId: string,
  date: string,
  serviceId: string,
) {
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("duration")
    .eq("id", serviceId)
    .single();

  if (!service) return { available: [], busy: [] };

  const dayOfWeek = new Date(date).getDay();
  const availability = await getBarberAvailability(barberId, dayOfWeek);

  if (!availability) return { available: [], busy: [] };

  const existingBookings = await getExistingBookings(barberId, date);

  const available = generateSlots({
    dayStart: availability.start_time,
    dayEnd: availability.end_time,
    slotDuration: service.duration,
    existingBookings: existingBookings || [],
  });

  return {
    available,
    busy: existingBookings || [],
    workingHours: {
      start: availability.start_time,
      end: availability.end_time,
    },
  };
}
