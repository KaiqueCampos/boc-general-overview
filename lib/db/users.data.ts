import bcrypt from "bcrypt";
import { supabase } from "@/lib/db/supabase";

export async function authenticateUser(email: string, password: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return { error: "USER_NOT_FOUND" };
  }

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
