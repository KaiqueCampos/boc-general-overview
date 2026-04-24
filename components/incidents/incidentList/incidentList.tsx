import { ScrollArea } from "../../ui/scroolArea";
import { IncidentListHeader } from "./incidentHeader";

interface IncidentListProps {
  filter: string;
  setFilter: (value: string) => void;
  incidents: any[];
  isLoading: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function IncidentList({
  filter,
  setFilter,
  incidents,
  isLoading,
  selectedId,
  onSelect,
}: IncidentListProps) {
  return (
    <div className="flex flex-col w-full lg:w-140 xl:w-155 2xl:w-170 shrink-0 border-r border-border min-h-0">
      <IncidentListHeader
        filter={filter}
        onFilterChange={setFilter}
        total={incidents.length}
      />

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-6 w-6 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : incidents.length === 0 ? (
            <h1>Nenhum Incidente Encontrado</h1>
          ) : (
            incidents.map((incident) => <h1>{incident.title}</h1>)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
