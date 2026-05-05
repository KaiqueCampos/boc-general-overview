import { JiraDependenciesResult, JiraDependency } from "@/types/jira";

export async function getJiraDependencies(
  issueKey: string,
): Promise<JiraDependenciesResult> {
  const res = await fetch(
    `${process.env.JIRA_BASE_URL}/issue/${issueKey}?fields=status,issuelinks`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.JIRA_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  return res.json();
}
