"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formdata: FormData) {
  const supabase = await createClient();

  const data = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (!error) redirect("/dashboard");
}
