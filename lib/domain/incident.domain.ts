import { Incident } from "@/types/incident";

// Count by Severity
export function countIncidentsBySeverity(incidents: Incident[]) {
  return incidents.reduce(
    (acc, incident) => {
      acc[incident.severity.toLowerCase() as "p1" | "p2" | "p3"]++;
      return acc;
    },
    { p1: 0, p2: 0, p3: 0 },
  );
}

// Sort by Severity
const priorityOrder: Record<Incident["severity"], number> = {
  P1: 0,
  P2: 1,
  P3: 2,
};

export function sortIncidentsBySeverity(incidents: Incident[]) {
  return incidents.sort(
    (a, b) => priorityOrder[a.severity] - priorityOrder[b.severity],
  );
}
