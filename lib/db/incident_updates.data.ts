import { supabase } from "./supabase";

interface IncidentUpdateInputProps {
  incident_id?: string;
  id?: string;
  author: string;
  message: string;
}

export async function deleteIncidentUpdate(id: string) {
  const { error } = await supabase
    .from("incident_updates")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function createIncidentUpdate({
  incident_id,
  author,
  message,
}: IncidentUpdateInputProps) {
  const { error } = await supabase.from("incident_updates").insert({
    incident_id: incident_id,
    author: author,
    message: message,
  });

  if (error) {
    console.error("Error creating incident update:", error);
    throw error;
  }

  return true;
}

export async function updateIncidentUpdate({
  id,
  author,
  message,
}: IncidentUpdateInputProps) {
  const { error } = await supabase
    .from("incident_updates")
    .update({
      author: author,
      message: message,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating incident update:", error);
    throw error;
  }

  return true;
}
