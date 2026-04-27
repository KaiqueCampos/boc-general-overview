"use client";

import { mockIncidents } from "@/app/page";
import { useState } from "react";
import { IncidentDetails } from "./incidentDetails/incidentDetails";
import { IncidentList } from "./incidentList/incidentList";

export function Incidents() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredIncidents =
    filter === "all"
      ? mockIncidents
      : mockIncidents.filter((i) => i.status === filter);

  const selectedIncident =
    mockIncidents.find((i) => i.inc === selectedId) ?? null;

  return (
    <div className="flex flex-1 min-h-0 w-full md:p-6 gap-4">
      <IncidentList
        filter={filter}
        setFilter={setFilter}
        incidents={filteredIncidents}
        isLoading={false}
        selectedId={selectedId}
        setSelect={setSelectedId}
      />

      <IncidentDetails
        incident={selectedIncident}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
