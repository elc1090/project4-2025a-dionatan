import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) redirect("/login");

  return <>{children}</>;
};

export default DashboardLayout;
