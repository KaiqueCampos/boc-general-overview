import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";

import { Incident } from "@/types/incident";
import { IncidentSeverityCard } from "./incidentSeverityCard";
import { IncidentStatCard } from "./incidentStatsCard";

interface IncidentStatsProps {
  openIncidents: Incident[];
  resolvedIncidents: Incident[];
  severityCount: {
    p1: number;
    p2: number;
    p3: number;
  };
}

export function IncidentStats({
  resolvedIncidents,
  openIncidents,
  severityCount,
}: IncidentStatsProps) {
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
