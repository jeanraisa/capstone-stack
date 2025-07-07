import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";

export function toIsoUtcDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatToHumanReadable({
  isoDate,
}: {
  isoDate: string | null | undefined;
}) {
  if (!isoDate) return null;
  const date = parseISO(isoDate);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isTomorrow(date)) return "Tomorrow";

  return format(date, "MMM d");
}
