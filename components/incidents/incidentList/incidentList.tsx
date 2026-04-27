import { useMemo } from "react";
import { Activity } from "lucide-react";

import { ScrollArea } from "../../ui/scroolArea";
import { IncidentCard } from "./incidentCard";
import { IncidentListHeader } from "./incidentHeader";
import { Text } from "@/components/ui/topography";
import { Incident } from "@/types/incident";

export type IncidentFilter = "all" | "open" | "resolved";

interface IncidentListProps {
  filter: IncidentFilter;
  setFilter: (value: IncidentFilter) => void;
  incidents: Incident[];
  isLoading: boolean;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export function IncidentList({
  filter,
  setFilter,
  incidents,
  isLoading,
  selectedId,
  setSelectedId,
}: IncidentListProps) {
  const sortedIncidents = useMemo(() => {
    const priorityOrder: Record<Incident["severity"], number> = {
      P1: 0,
      P2: 1,
      P3: 2,
    };

    return [...incidents].sort(
      (a, b) => priorityOrder[a.severity] - priorityOrder[b.severity],
    );
  }, [incidents]);

  return (
    <div className="w-full min-w-0 max-w-4xl">
      <IncidentListHeader
        filter={filter}
        onFilterChange={setFilter}
        total={incidents.length}
      />

      <div className="flex flex-col w-full min-w-0 h-full">
        <ScrollArea className="flex-1 min-h-0 w-full">
          <div className="p-3 space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="h-6 w-6 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : incidents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Activity className="h-8 w-8 mb-2 opacity-30" />
                <Text
                  variant="caption"
                  color="text-muted-foreground"
                  className="text-sm"
                >
                  Não há nenhum incidente ocorrendo no ambiente.
                </Text>
              </div>
            ) : (
              sortedIncidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  isSelected={selectedId === incident.inc}
                  onClick={() => setSelectedId(incident.inc)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
