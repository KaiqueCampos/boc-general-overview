import { differenceInMinutes, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const BRAZIL_TIMEZONE = "America/Sao_Paulo";

/**
 * Formats a date using Brazil timezone (absolute display)
 */
export function formatDateBR(
  date: string | Date,
  withTime: boolean = true,
): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: BRAZIL_TIMEZONE,
    dateStyle: "medium",
    timeStyle: withTime ? "short" : undefined,
  }).format(new Date(date));
}

/**
 * Returns a human-readable relative time (e.g. "2 hours ago")
 */
export function getTimeFromNow(date: string | Date): string {
  return formatDistanceToNow(new Date(date), {
    locale: ptBR,
    addSuffix: true,
  });
}

/**
 * Returns the difference in minutes between now and a given date
 * Useful for SLA, alerts, and business rules
 */
export function getMinutesSince(date: string | Date): number {
  return differenceInMinutes(new Date(), new Date(date));
}

/**
 * Combined utility for UI display:
 * - relative time (duration)
 * - absolute formatted date (Brazil timezone)
 */
export function getIncidentTimeInfo(date: string | Date) {
  const parsedDate = new Date(date);

  return {
    duration: formatDistanceToNow(parsedDate, {
      locale: ptBR,
      addSuffix: true,
    }),
    start: formatDateBR(parsedDate),
  };
}
