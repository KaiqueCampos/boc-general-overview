import { IncidentUpdates } from "@/types/incident";

export function sortUpdates(updates: IncidentUpdates[]) {
  return [...updates].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}
