export function combineDateAndTime(date: Date, time: string): Date {
  const [hours = "0", minutes = "0"] = time.split(":");
  const result = new Date(date);
  result.setHours(Number(hours), Number(minutes), 0, 0);
  return result;
}

export function formatPrettyDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPrettyTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Unknown";
  }
}

export const TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export function formatTimeLabel(value: string): string {
  const [h = "0", m = "00"] = value.split(":");
  const hour = Number(h);
  const suffix = hour < 12 ? "AM" : "PM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${suffix}`;
}
