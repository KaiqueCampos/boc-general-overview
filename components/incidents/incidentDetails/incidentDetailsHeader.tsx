import { X } from "lucide-react";
import { Text } from "@/components/ui/topography";

import SeverityBadge from "@/components/ui/severityBadge";
import StatusBadge from "@/components/ui/statusBadge";
import { Button } from "@/components/ui/button";

import { Incident } from "@/types/incident";
import { IncidentStarInfo } from "../incidentStartInfo";

interface IncidentDetailsHeaderProps {
  incident: Pick<
    Incident,
    "title" | "severity" | "status" | "inc" | "created_at"
  >;
  onClose: () => void;
}

export function IncidentDetailsHeader({
  incident,
  onClose,
}: IncidentDetailsHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <SeverityBadge severity={incident.severity} size="lg" />
          <StatusBadge status={incident.status} size="lg" />
          <IncidentStarInfo created_at={incident.created_at} />
        </div>

        <Text variant="h2" weight="bold" className="leading-snug line-clamp-2">
          {incident.title}
        </Text>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="shrink-0 text-muted-foreground hover:text-foreground -mt-1"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
