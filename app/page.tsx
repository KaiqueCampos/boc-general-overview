import { Header } from "@/components/header";
import { IncidentStats } from "@/components/incidentStatsResume";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden ">
      <Header />

      <main className="flex-1 p-4 md:p-6">
        <IncidentStats />
      </main>
    </div>
  );
}
