import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/topography";

export type IncidentFilter = "all" | "open" | "resolved";

interface IncidentListHeaderProps {
  filter: IncidentFilter;
  onFilterChange: (value: IncidentFilter) => void;
  total: number;
}

export function IncidentListHeader({
  filter,
  onFilterChange,
  total,
}: IncidentListHeaderProps) {
  return (
    <div className="shrink-0 px-4 py-3 border-b border-border/50">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Title */}
        <div>
          <Text
            variant="subtitle"
            weight="bold"
            className="uppercase tracking-wider text-foreground"
          >
            Incidentes
          </Text>

          <Text
            variant="caption"
            weight="bold"
            className="text-muted-foreground mt-0.5"
          >
            {total} total
          </Text>
        </div>

        {/* Filters */}
        <Tabs
          value={filter}
          onValueChange={(value) => onFilterChange(value as IncidentFilter)}
        >
          <TabsList className="h-8 bg-secondary">
            <TabsTrigger value="all" className="text-xs px-3 h-6">
              Todos
            </TabsTrigger>
            <TabsTrigger value="open" className="text-xs px-3 h-6">
              Abertos
            </TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs px-3 h-6">
              Resolvidos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
