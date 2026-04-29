import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { getUserBookings } from "@/lib/queries";

export async function BookingsList({
  locale,
}: {
  locale: string;
}) {
  const t = await getTranslations("MyBookings");
  const bookings = await getUserBookings();

  if (bookings.length === 0) {
    return (
      <Card className="p-12 text-center glass border-dashed">
        <p className="text-muted-foreground">{t("noBookings")}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          className={cn(
            "overflow-hidden border-l-4",
            booking.status === "confirmed"
              ? "border-l-green-500"
              : booking.status === "pending"
                ? "border-l-primary"
                : "border-l-muted opacity-60",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge
                variant={
                  booking.status === "confirmed" ? "default" : "secondary"
                }
              >
                {t(
                  `status.${booking.status as "confirmed" | "pending" | "cancelled"}`,
                )}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                #{booking.id.substring(0, 8)}
              </span>
            </div>
            <CardTitle className="flex items-center gap-2 mt-2">
              <Scissors className="w-4 h-4 text-primary" />
              {booking.services?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-bold">
                {new Date(booking.booking_date).toLocaleDateString(
                  locale === "ar" ? "ar-EG" : "en-US",
                  { dateStyle: "full" },
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>
                {booking.start_time} - {booking.end_time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{booking.barbers?.name}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
