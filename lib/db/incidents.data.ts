import { Incident } from "@/types/incident";
import { supabase } from "./supabase";

export async function getIncidents(): Promise<Incident[]> {
  const { data, error } = await supabase
    .from("incidents")
    .select(
      `
        *,
        incident_updates (*)
        `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching incidents:", error);
    throw error;
  }

  return data ?? [];
}
