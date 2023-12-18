import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Info() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const session = await supabase.auth.getSession();
  return (
    <>
      <p>App</p>
      <p className="break-words">{JSON.stringify(session.data.session)}</p>
    </>
  );
}
