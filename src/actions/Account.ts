"use server";

import {
  createServerComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

async function checkSupabaseCookie() {
  const cookieStore = cookies();
  if (!cookieStore) throw new Error("Ошибка с данными cookie");

  const supabaseUser = createServerComponentClient({
    cookies: () => cookieStore,
  });
  if (!supabaseUser) throw new Error("Ошибка получения пользователя");

  return { cookieStore, supabaseUser };
}

async function getSupabaseUser(supabaseUser: SupabaseClient) {
  const {
    data: { user },
    error,
  } = await supabaseUser.auth.getUser();

  if (error) throw error;

  if (!user || !user?.id) throw new Error("Пользователь не найден");

  return { user };
}

export async function DeleteUser() {
  try {
    const { supabaseUser, cookieStore } = await checkSupabaseCookie();

    const { user } = await getSupabaseUser(supabaseUser);

    // создание соединения сервера с supabase на правах администратора и удаление пользователя
    const supabaseServer = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string,
    );

    const { error: DeleteError } = await supabaseServer.auth.admin.deleteUser(
      user.id,
    );

    if (DeleteError)
      throw DeleteError || new Error("Удалить пользователя не получилось");

    cookieStore.delete("sb-dtuixibphpgrhylejwrt-auth-token");
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function GetUser() {
  try {
    const { supabaseUser, cookieStore } = await checkSupabaseCookie();

    const { user } = await getSupabaseUser(supabaseUser);

    return { user };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
