import Link from "next/link";
import MainMenuDropDown from "@/components/module/MainMenuDropDown";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Info() {
  const cookieStore = cookies();
  const supabaseServer = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const session = await supabaseServer.auth.getSession();

  return (
    <>
      <MainMenuDropDown />
      <p>App</p>
      <Link href="/front" className="text-green-800">
        Front page
      </Link>
      <hr />
      <p className="break-words">{JSON.stringify(session.data.session)}</p>
    </>
  );
}
