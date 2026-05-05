import bcrypt from "bcrypt";
import { supabase } from "@/lib/db/supabase";
export const runtime = "nodejs";

export async function authenticateUser(email: string, password: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error(error);
    return { error: "DB_ERROR" };
  }

  if (!data || data.length === 0) {
    return { error: "USER_NOT_FOUND" };
  }

  const user = data[0];

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    return { error: "INVALID_PASSWORD" };
  }

  return { user };
}

type UserNameResult = {
  name: string;
};

export async function getUserById(id: string): Promise<UserNameResult | null> {
  const { data, error } = await supabase
    .from("users")
    .select("name")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return data;
}
