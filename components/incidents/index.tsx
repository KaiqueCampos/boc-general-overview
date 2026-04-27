"use client";

import { Incident } from "@/types/incident";
import { useState } from "react";
import { IncidentDetails } from "./incidentDetails/incidentDetails";
import { IncidentList } from "./incidentList/incidentList";

type IncidentFilterProps = "all" | "open" | "resolved";

interface IncidentsProps {
  incidents: Incident[];
}

export function Incidents({ incidents }: IncidentsProps) {
  const [filter, setFilter] = useState<IncidentFilterProps>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredIncidents =
    filter === "all" ? incidents : incidents.filter((i) => i.status === filter);

  const selectedIncident = incidents.find((i) => i.inc === selectedId) ?? null;

  return (
    <div className="flex flex-1 min-h-0 w-full md:p-6 gap-4">
      <IncidentList
        filter={filter}
        setFilter={setFilter}
        incidents={filteredIncidents}
        isLoading={false}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <IncidentDetails
        incident={selectedIncident}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
