import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Info() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const session = await supabase.auth.getSession();
  return (
    <>
      <p>App</p>
      <Link href="/front" className="text-green-800">
        Front page
      </Link>
      <hr />
      <p className="break-words">{JSON.stringify(session.data.session)}</p>
    </>
  );
}
