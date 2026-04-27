import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getIncidentTimeInfo(createdAt: string) {
  const date = new Date(createdAt);

  const start = format(date, "dd/MM/yyyy HH:mm");
  const duration = formatDistanceToNow(date, {
    addSuffix: false,
    locale: ptBR,
  });

  return {
    start,
    duration,
  };
}
