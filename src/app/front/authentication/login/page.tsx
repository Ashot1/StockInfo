"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClientComponentClient();

  return (
    <div>
      <button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${location.origin}/auth/callback` },
          });
        }}
      >
        Google
      </button>
      <button
        onClick={async () => {
          const session = await supabase?.auth?.getSession();
          console.log(session);
        }}
      >
        Info
      </button>
      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
}
