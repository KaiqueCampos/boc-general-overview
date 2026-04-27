import { Clock, ChevronRight, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MergeClasses } from "@/utils/mergeClasses";
import { Text } from "@/components/ui/topography";

import SeverityBadge from "@/components/ui/severityBadge";
import StatusBadge from "@/components/ui/statusBadge";
import { getIncidentTimeInfo } from "@/utils/CalculateIncidentDuration";

interface IncidentUpdate {
  message: string;
  author: string;
  created_at: string;
}

interface Incident {
  inc: string;
  incident_id: string;
  title: string;
  severity: "P1" | "P2" | "P3";
  status: "open" | "resolved" | "canceled";
  responsible_team?: string;
  last_update_at?: string | null;
  created_at: string;
  last_update_message?: string | null;
  updates?: IncidentUpdate[];
}

interface IncidentCardProps {
  incident: Incident;
  isSelected: boolean;
  onClick: () => void;
}

export function IncidentCard({
  incident,
  isSelected,
  onClick,
}: IncidentCardProps) {
  const lastUpdate = incident.last_update_at
    ? formatDistanceToNow(new Date(incident.last_update_at), {
        addSuffix: true,
      })
    : null;

  const severityAccent = {
    P1: "border-l-severity-p1",
    P2: "border-l-severity-p2",
    P3: "border-l-severity-p3",
  };

  const lastUpdateItem = incident.updates?.length
    ? incident.updates[incident.updates.length - 1]
    : null;

  const lastUpdateTime = lastUpdateItem?.created_at
    ? formatDistanceToNow(new Date(lastUpdateItem.created_at), {
        addSuffix: true,
      })
    : null;

  const { duration, start } = getIncidentTimeInfo(incident.created_at);

  return (
    <button
      onClick={onClick}
      className={MergeClasses(
        "w-full overflow-hidden text-left rounded-lg border border-l-[3px] transition-all duration-200",
        "hover:bg-accent/60 group",
        severityAccent[incident.severity] || "border-l-border",
        isSelected
          ? "bg-accent border-accent ring-1 ring-primary/50"
          : "bg-card border-border",
      )}
    >
      <div className="px-4 py-3 min-w-0">
        {/* Row 1 */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Text
              variant="caption"
              weight="semibold"
              className="font-mono text-muted-foreground shrink-0"
            >
              {incident.inc}
            </Text>

            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>

          <ChevronRight
            className={MergeClasses(
              "h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-200",
              isSelected && "rotate-90 text-primary",
            )}
          />
        </div>

        {/* Row 2 - Title */}
        <Text
          variant="text"
          weight="semibold"
          className="leading-snug line-clamp-2 mb-1.5 text-foreground"
        >
          {incident.title}
        </Text>

        {/* Row 3 - Meta */}
        <div className="flex items-center gap-5">
          {incident.responsible_team && (
            <>
              <Text
                variant="caption"
                className="flex items-center gap-1 text-muted-foreground"
              >
                <Users className="h-3 w-3" />
                {incident.responsible_team}
              </Text>
              <Text variant="caption" className="text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {start} • {duration}
                </span>
              </Text>
            </>
          )}
        </div>

        {/* Row 4 - Last update */}
        {lastUpdateItem && (
          <div className="mt-2 border-t border-border/50 pt-2 space-y-0.5">
            <Text variant="caption" className="text-muted-foreground/80">
              <span className="font-bold text-muted-foreground">
                Última Atualização ({lastUpdateTime})
              </span>
            </Text>

            <Text
              variant="caption"
              className="text-muted-foreground/70 line-clamp-1"
            >
              <span className="text-foreground/50">
                {lastUpdateItem.author}
              </span>
              {" - "}
              {lastUpdateItem.message}
            </Text>
          </div>
        )}
      </div>
    </button>
  );
}
