import { Header } from "@/components/header";
import { Incidents } from "@/components/incidents";
import { IncidentStats } from "@/components/incidentStatsResume";
import { getIncidents } from "@/lib/db/incidents.data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const incidents = await getIncidents();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden ">
      <Header />
      <IncidentStats incidents={incidents} />
      <Incidents incidents={incidents} />
    </div>
  );
}
