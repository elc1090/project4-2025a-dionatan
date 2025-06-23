import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  return redirect("/dashboard");
}
