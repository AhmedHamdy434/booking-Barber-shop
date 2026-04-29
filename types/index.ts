export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  is_active: boolean;
  description?: string;
}

export interface Barber {
  id: string;
  name: string;
  is_active: boolean;
  specialty?: string;
  avatar_url?: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  barber_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;

  // Joined fields
  services?: Partial<Service>;
  barbers?: Partial<Barber>;
}

export interface BarberAvailability {
  id: string;
  barber_id: string;
  day_of_week: number; // 0-6
  start_time: string;
  end_time: string;
}
