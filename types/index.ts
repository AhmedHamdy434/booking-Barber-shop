export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  is_active: boolean;
  created_at?: string;
}

export interface Barber {
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
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
