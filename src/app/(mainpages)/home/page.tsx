import Link from "next/link";
import MainMenuDropDown from "@/components/module/MainMenuDropDown";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { URLList } from "@/utils/const";

export default async function Info() {
  const cookieStore = cookies();
  const supabaseServer = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const session = await supabaseServer.auth.getSession();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  return (
    <>
      <div className="flex justify-between 768p:justify-center">
        <span className="max-w-[50%]">
          <p className="opacity-50 text-xs 768p:text-sm 768p:text-center">
            Добро пожаловать
          </p>
          <p className="truncate 768p:text-lg 768p:text-center">
            {user?.user_metadata.full_name}
          </p>
        </span>
        <span className="768p:hidden">
          <MainMenuDropDown />
        </span>
      </div>
    </>
  );
}
