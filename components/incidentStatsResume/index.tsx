import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { IncidentStatCard } from "./incidentStatsCard";
import { IncidentSeverityCard } from "./incidentSeverityCard";

export function IncidentStats() {
  return (
    <main className="flex-1 p-4 md:p-6 ">
      <div className=" flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <IncidentStatCard
            icon={Activity}
            value={2}
            label="Total de Incidentes em Aberto"
            variant="open"
          />

          <IncidentStatCard
            icon={CheckCircle2}
            value={5}
            label="Resolvidos — Abril"
            variant="resolved"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <IncidentSeverityCard
            severity="p1"
            title="P1 — Impacto Total"
            value={2}
            icon={AlertTriangle}
          />

          <IncidentSeverityCard
            severity="p2"
            title="P2 — Impacto Parcial"
            value={4}
            icon={AlertCircle}
          />

          <IncidentSeverityCard
            severity="p3"
            title="P3 — Sem Impacto"
            value={7}
            icon={Shield}
          />
        </div>
      </div>
    </main>
  );
}
