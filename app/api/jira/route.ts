import { getJiraDependencies } from "@/lib/integrations/jira";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const issueKey = searchParams.get("issueKey");

  if (!issueKey) {
    return new Response("Missing issueKey", { status: 400 });
  }

  const data = await getJiraDependencies(issueKey);

  return Response.json(data);
}
