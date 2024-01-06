"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <br />
      <button
        onClick={async () => {
          const session = await supabase?.auth?.getSession();
          console.log(session);
        }}
      >
        Info
      </button>
      <br />
      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Log out
      </button>
      <br />
      <button
        onClick={() => {
          supabase.auth
            .signInWithPassword({
              email: "123@mail.ru",
              password: "123456",
              options: { data: { coins: 2 }, captchaToken: "" },
            })
            .then((response) => console.log(response))
            .catch((e) => console.log(e.message));
        }}
      >
        With email
      </button>
      <br />
      <button
        onClick={async () => {
          supabase.auth.signInWithOAuth({
            provider: "discord",
            options: { redirectTo: `${location.origin}/auth/callback` },
          });
        }}
      >
        Discord
      </button>
      <br />
      <Link href="/front">Back</Link>
    </div>
  );
}
