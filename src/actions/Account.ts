"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function DeleteUser() {
  try {
    const cookieStore = cookies();
    const supabaseServer = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string,
    );

    const {
      data: { user },
      error: UserError,
    } = await supabaseServer.auth.getUser();

    if (UserError) throw UserError.message || "Пользователь не найден";

    if (!user?.id) throw "Пользователь не найден";

    const { error: DeleteError } = await supabase.auth.admin.deleteUser(
      user.id,
    );

    if (DeleteError)
      throw DeleteError.message || "Удалить пользователя не получилось";

    cookieStore.delete("sb-dtuixibphpgrhylejwrt-auth-token");
  } catch (error) {
    return { error };
  }
}
