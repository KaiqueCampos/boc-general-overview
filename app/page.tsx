import { Header } from "@/components/header";
import { Incidents } from "@/components/incidents";
import { IncidentStats } from "@/components/incidentStatsResume";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden ">
      <Header />
      <IncidentStats />
      <Incidents />
    </div>
  );
}
