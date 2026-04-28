import { Header } from "@/components/header";
import { Incidents } from "@/components/incidents";
import { IncidentStats } from "@/components/incidentStatsResume";
import { getIncidents } from "@/lib/flows/incident.flow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { openIncidents, resolvedIncidents, severityCount, sortedIncidents } =
    await getIncidents();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden ">
      <Header />
      <IncidentStats
        resolvedIncidents={resolvedIncidents}
        openIncidents={openIncidents}
        severityCount={severityCount}
      />
      <Incidents incidents={sortedIncidents} />
    </div>
  );
}
