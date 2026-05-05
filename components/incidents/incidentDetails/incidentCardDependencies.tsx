import { Ticket } from "lucide-react";
import { IncidentVinculatedCard } from "./incidentVinculatedCards";
import { JiraDependenciesResult } from "@/types/jira";

interface IncidentCardDependenciesProps {
  data: JiraDependenciesResult | null;
}

export function IncidentCardDependencies({
  data,
}: IncidentCardDependenciesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-6">
      <IncidentVinculatedCard
        icon={Ticket}
        label="INC"
        value={data?.incident.key}
        status={data?.incident.status}
        hrefPrefix="https://abasteceai.atlassian.net/browse/"
      />

      <IncidentVinculatedCard
        icon={Ticket}
        label="BOCM"
        value={data?.bocm?.key}
        status={data?.bocm?.status}
        hrefPrefix="https://abasteceai.atlassian.net/browse/"
      />

      <IncidentVinculatedCard
        icon={Ticket}
        label="GPROB"
        value={data?.gprob?.key}
        status={data?.gprob?.status}
        hrefPrefix="https://abasteceai.atlassian.net/browse/"
      />
    </div>
  );
}
