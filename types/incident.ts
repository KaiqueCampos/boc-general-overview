export type IncidentStatus = "open" | "resolved";
export type IncidentSeverity = "P1" | "P2" | "P3";

export interface IncidentUpdates {
  id: string;
  message: string;
  author: string;
  created_at: string;
  incident_id: string;
}

export interface Incident {
  id: string;
  title: string;
  bocm: string | null;
  gprob: string | null;
  business_impact: string;
  impacted_service: string;
  responsible_team: string;
  platform: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  teams_message_id: string | null;
  monitor_datadog_id: string | null;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
  inc: string;

  incident_updates: IncidentUpdates[];
}
