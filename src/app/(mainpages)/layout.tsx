import { ReactNode } from "react";
import MainHeader from "@/components/module/MainHeader";
import AuthProvider from "@/hoc/AuthProvider";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { supabaseServer } from "@/utils/SupabaseServer.init";

export default async function MainPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const supabaseServer = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (user)
    return (
      <>
        <AuthProvider value={user}>
          <MainHeader />
          {children}
        </AuthProvider>
      </>
    );
}
