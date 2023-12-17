import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Info() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const session = await supabase.auth.getSession();
  return (
    <div>
      <p>App</p>
      <p>{JSON.stringify(session.data.session)}</p>
    </div>
  );
}
