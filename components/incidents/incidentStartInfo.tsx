import { Clock } from "lucide-react";
import { Text } from "../ui/topography";
import { getIncidentTimeInfo } from "@/utils/time";

interface IncidentStarInfoProps {
  created_at: string;
}

export function IncidentStarInfo({ created_at }: IncidentStarInfoProps) {
  const { duration, start } = getIncidentTimeInfo(created_at);
  return (
    <Text variant="caption" className="text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {start} • {duration}
      </span>
    </Text>
  );
}
