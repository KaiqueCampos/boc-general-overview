import { JiraDependenciesResult, JiraDependency } from "@/types/jira";

export function parseJiraDependencies(data: any): JiraDependenciesResult {
  if (!data) return null;

  const incidentKey = data.key ?? null;
  const incidentStatus = data.fields?.status?.name ?? null;

  const issueLinks = data.fields?.issuelinks ?? [];

  let bocm: JiraDependency | null = null;
  let gprob: JiraDependency | null = null;

  for (const link of issueLinks) {
    const issue = link.outwardIssue ?? link.inwardIssue ?? null;

    if (!issue) continue;

    const key: string = issue.key;
    const status: string | null = issue.fields?.status?.name ?? null;

    if (!bocm && key.startsWith("BOCM")) {
      bocm = { key, status };
    }

    if (!gprob && key.startsWith("GPROB")) {
      gprob = { key, status };
    }

    if (bocm && gprob) break;
  }

  return {
    incident: {
      key: incidentKey,
      status: incidentStatus,
    },
    bocm,
    gprob,
  };
}
