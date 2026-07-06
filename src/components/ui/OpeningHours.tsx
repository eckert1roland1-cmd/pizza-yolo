import { OPENING_HOURS } from "@/lib/site-config";

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const openDays = new Set(OPENING_HOURS.flatMap((h) => h.dayOfWeek));
const closedDays = ALL_DAYS.filter((day) => !openDays.has(day));

export function OpeningHours({ className }: { className?: string }) {
  return (
    <div className={className}>
      {OPENING_HOURS.map((hours) => (
        <p key={hours.dayOfWeek.join(",")}>
          {hours.dayOfWeek.join(", ")}: {hours.opens} – {hours.closes}
        </p>
      ))}
      {closedDays.length > 0 ? (
        <p>Closed {closedDays.join(", ")}</p>
      ) : null}
    </div>
  );
}
