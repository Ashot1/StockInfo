import Link from "next/link";
import MainMenuDropDown from "@/components/widgets/MainMenuDropDown";
import { supabaseServer } from "@/utils/SupabaseServer.init";

export default async function Info() {
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
