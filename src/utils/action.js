"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation"; 

const signInWith = (provider) => async () => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });
  if (error) console.log(error);

  redirect(data.url);
};

const signinWithGoogle = signInWith("google");

export { signinWithGoogle };
