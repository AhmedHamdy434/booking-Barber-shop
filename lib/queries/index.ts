import { createClient } from "@/lib/supabase/server";
import "server-only";

export async function getActiveServices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getActiveBarbers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("barbers")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getBarberAvailability(
  barberId: string,
  dayOfWeek: number,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("barber_availability")
    .select("*")
    .eq("barber_id", barberId)
    .eq("day_of_week", dayOfWeek)
    .single();

  if (error && error.code !== "PGRST116") throw error; // Ignore not found
  return data;
}

export async function getExistingBookings(barberId: string, date: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("time, services(name, duration)")
    .eq("barber_id", barberId)
    .eq("date", date)
    .neq("status", "cancelled");

  if (error) throw error;

  return (data as unknown as { time: string; services: { name: string; duration: number } | null }[]).map((b) => {
    const startTime = b.time;
    const duration = b.services?.duration || 0;
    const serviceName = b.services?.name || "";

    const [h, m] = startTime.split(":").map(Number);
    const totalMinutes = h * 60 + m + duration;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    const endTime = `${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}`;

    return {
      start_time: startTime,
      end_time: endTime,
      service_name: serviceName,
    };
  });
}

export async function getUserBookings() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      services(name, price, duration),
      barbers(name)
    `,
    )
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("time", { ascending: false });

  if (error) throw error;

  return data.map((booking) => {
    const startTime = booking.time;
    const duration = booking.services?.duration || 0;

    const [h, m] = startTime.split(":").map(Number);
    const totalMinutes = h * 60 + m + duration;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    const endTime = `${endH.toString().padStart(2, "0")}:${endM
      .toString()
      .padStart(2, "0")}`;

    return {
      ...booking,
      booking_date: booking.date,
      start_time: startTime,
      end_time: endTime,
    };
  });
}
