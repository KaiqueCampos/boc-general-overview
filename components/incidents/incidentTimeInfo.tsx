import { Clock } from "lucide-react";
import { Text } from "../ui/topography";
import { formatDateBR, getIncidentTimeInfo } from "@/utils/time";

interface IncidentTimeInfoProps {
  created_at: string;
  closed_at: string | null;
}

export function IncidentTimeInfo({
  created_at,
  closed_at,
}: IncidentTimeInfoProps) {
  const { duration, start } = getIncidentTimeInfo(created_at);

  const label = closed_at
    ? `Encerrado ${formatDateBR(closed_at)}`
    : `Aberto ${start} • ${duration}`;

  return (
    <Text variant="caption" className="text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {label}
      </span>
    </Text>
  );
}
