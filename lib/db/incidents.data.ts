import { Incident } from "@/types/incident";
import { supabase } from "./supabase";

/**
 * Data access function for retrieving incident records
 * from the database, including their related updates.
 *
 * Returns incidents with the following rules:
 * - All incidents with status "open"
 * - Incidents with status "resolved" only if they were
 *   created within the current month
 *
 * Results are ordered by creation date in descending order
 * (most recent first).
 *
 * Throws an error if the database query fails.
 */

const startOfMonth = new Date();
startOfMonth.setDate(1);

export async function getOpenAndRecentResolvedIncidents(): Promise<Incident[]> {
  const { data, error } = await supabase
    .from("incidents")
    .select(
      `
      *,
      incident_updates (*)
    `,
    )
    .or(
      `status.eq.open,and(status.eq.resolved,created_at.gte.${startOfMonth.toISOString()})`,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }

  return data ?? [];
}
