/**
 * Core business logic for slot generation.
 * Follows the 15-minute increment rule.
 */

export interface BookingInterval {
  start_time: string; // ISO or "HH:mm"
  end_time: string;   // ISO or "HH:mm"
}

export interface SlotParams {
  dayStart: string;    // "09:00"
  dayEnd: string;      // "17:00"
  slotDuration: number; // in minutes (e.g., 30, 45, 60)
  existingBookings: BookingInterval[];
  increment?: number;   // default 15
}

/**
 * Generates available time slots for a given day.
 * Pure function, no side effects.
 */
export function generateSlots({
  dayStart,
  dayEnd,
  slotDuration,
  existingBookings,
  increment = 15
}: SlotParams): string[] {
  const slots: string[] = [];
  
  let current = timeToMinutes(dayStart);
  const end = timeToMinutes(dayEnd);

  while (current + slotDuration <= end) {
    const slotStartStr = minutesToTime(current);
    const slotEndStr = minutesToTime(current + slotDuration);

    const isOverlapping = existingBookings.some(booking => {
      const bStart = timeToMinutes(extractTime(booking.start_time));
      const bEnd = timeToMinutes(extractTime(booking.end_time));
      
      // A slot overlaps if it starts before a booking ends AND ends after a booking starts
      return current < bEnd && (current + slotDuration) > bStart;
    });

    if (!isOverlapping) {
      slots.push(slotStartStr);
    }

    current += increment;
  }

  return slots;
}

// Helpers
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function extractTime(isoOrTime: string): string {
  if (isoOrTime.includes('T')) {
    // It's an ISO string
    return isoOrTime.split('T')[1].substring(0, 5);
  }
  return isoOrTime;
}
