import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";

import { IncidentStatCard } from "./incidentStatsCard";
import { IncidentSeverityCard } from "./incidentSeverityCard";
import { Incident } from "@/types/incident";
import { useMemo } from "react";

interface IncidentStatsProps {
  incidents: Incident[];
}

export function IncidentStats({ incidents }: IncidentStatsProps) {
  const openIncidents = useMemo(
    () => incidents.filter((i) => i.status === "open"),
    [incidents],
  );

  const resolvedIncidents = useMemo(
    () => incidents.filter((i) => i.status === "resolved"),
    [incidents],
  );

  const severityCount = useMemo(() => {
    return openIncidents.reduce(
      (acc, incident) => {
        acc[incident.severity.toLowerCase() as "p1" | "p2" | "p3"]++;
        return acc;
      },
      { p1: 0, p2: 0, p3: 0 },
    );
  }, [openIncidents]);

  return (
    <main className="p-4 md:p-6 ">
      <div className=" flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <IncidentStatCard
            icon={Activity}
            value={openIncidents.length}
            label="Total de Incidentes em Aberto"
            variant="open"
          />

          <IncidentStatCard
            icon={CheckCircle2}
            value={resolvedIncidents.length}
            label="Resolvidos — Abril"
            variant="resolved"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 ">
          <IncidentSeverityCard
            severity="p1"
            title="P1 — Impacto Total"
            value={severityCount.p1}
            icon={AlertTriangle}
          />

          <IncidentSeverityCard
            severity="p2"
            title="P2 — Impacto Parcial"
            value={severityCount.p2}
            icon={AlertCircle}
          />

          <IncidentSeverityCard
            severity="p3"
            title="P3 — Sem Impacto"
            value={severityCount.p3}
            icon={Shield}
          />
        </div>
      </div>
    </main>
  );
}
