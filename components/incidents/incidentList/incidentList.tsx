import { ScrollArea } from "../../ui/scroolArea";
import { IncidentCard } from "./incidentCard";
import { IncidentListHeader } from "./incidentHeader";

interface IncidentListProps {
  filter: string;
  setFilter: (value: string) => void;
  incidents: any[];
  isLoading: boolean;
  selectedId: string | null;
  setSelect: (id: string | null) => void;
}

export function IncidentList({
  filter,
  setFilter,
  incidents,
  isLoading,
  selectedId,
  setSelect,
}: IncidentListProps) {
  const priorityOrder = {
    P1: 0,
    P2: 1,
    P3: 2,
  };

  const sortedIncidents = [...incidents].sort(
    (a, b) => priorityOrder[a.severity] - priorityOrder[b.severity],
  );

  return (
    <div className="w-full min-w-0 max-w-4xl ">
      <IncidentListHeader
        filter={filter}
        onFilterChange={setFilter}
        total={incidents.length}
      />

      <div className="flex flex-col w-full  min-w-0 h-full ">
        <ScrollArea className="flex-1 min-h-0 w-full">
          <div className="p-3 space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="h-6 w-6 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : incidents.length === 0 ? (
              <h1>Nenhum Incidente Encontrado</h1>
            ) : (
              sortedIncidents.map((incident) => (
                <IncidentCard
                  incident={incident}
                  isSelected={selectedId === incident.inc}
                  onClick={() => setSelect(incident.inc)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
