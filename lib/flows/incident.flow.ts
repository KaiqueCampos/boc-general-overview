import { Incident } from "@/types/incident";
import { getOpenAndRecentResolvedIncidents } from "../db/incidents.data";
import {
  countIncidentsBySeverity,
  sortIncidentsBySeverity,
} from "../domain/incident.domain";

interface getIncidentsProps {
  openIncidents: Incident[];
  resolvedIncidents: Incident[];
  sortedIncidents: Incident[];
  severityCount: {
    p1: number;
    p2: number;
    p3: number;
  };
}

export async function getIncidents(): Promise<getIncidentsProps> {
  const incidents = await getOpenAndRecentResolvedIncidents();
  const openIncidents = incidents.filter((i) => i.status === "open");
  const resolvedIncidents = incidents.filter((i) => i.status === "resolved");
  const severityCount = countIncidentsBySeverity(incidents);
  const sortedIncidents = sortIncidentsBySeverity(incidents);

  return {
    openIncidents,
    resolvedIncidents,
    severityCount,
    sortedIncidents,
  };
}
