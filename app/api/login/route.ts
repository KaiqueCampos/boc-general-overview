import { authenticateUser } from "@/lib/db/users.data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { user, error } = await authenticateUser(email, password);

  if (error) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("session", user.id, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
