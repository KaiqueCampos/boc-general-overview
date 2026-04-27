export type IncidentStatus = "open" | "resolved";
export type IncidentSeverity = "P1" | "P2" | "P3";

export interface IncidentUpdate {
  message: string;
  author: string;
  created_at: string;
}

export interface Incident {
  id: string;
  title: string;
  bocm?: string;
  gprob?: string;
  business_impact: string;
  impacted_service: string;
  responsible_team: string;
  platform: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  teams_message_id: string;
  monitor_datadog_id: string;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
  inc: string;
  updates: IncidentUpdate[];
}
