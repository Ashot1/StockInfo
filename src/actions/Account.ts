'use server'

import {
   createServerComponentClient,
   SupabaseClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClient, UserAttributes } from '@supabase/supabase-js'
import TryCatch from '@/utils/TryCatch'
import { User } from '@supabase/gotrue-js'

async function checkSupabaseCookie() {
   const cookieStore = cookies()
   if (!cookieStore) throw new Error('Ошибка с данными cookie')

   const supabaseUser = createServerComponentClient({
      cookies: () => cookieStore,
   })
   if (!supabaseUser) throw new Error('Ошибка получения пользователя')

   return { cookieStore, supabaseUser }
}

async function getSupabaseUser(supabaseUser: SupabaseClient) {
   const {
      data: { user },
      error,
   } = await supabaseUser.auth.getUser()

   if (error) throw error

   if (!user || !user?.id) throw new Error('Пользователь не найден')

   return { user }
}

export async function DeleteUser() {
   return TryCatch<undefined>(async () => {
      const { supabaseUser, cookieStore } = await checkSupabaseCookie()

      const { user } = await getSupabaseUser(supabaseUser)

      // создание соединения сервера с supabase на правах администратора и удаление пользователя
      const supabaseServer = createClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL as string,
         process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string
      )

      const { error: DeleteError } = await supabaseServer.auth.admin.deleteUser(
         user.id
      )

      if (DeleteError) throw DeleteError

      cookieStore.delete('sb-dtuixibphpgrhylejwrt-auth-token')

      return { data: undefined }
   })
}

export async function GetUser() {
   return TryCatch<User>(async () => {
      const { supabaseUser, cookieStore } = await checkSupabaseCookie()

      const { user } = await getSupabaseUser(supabaseUser)

      return { data: user }
   })
}

export async function UpdateUser({
   data: IncomingData,
}: {
   data: { [key: string]: string }
}) {
   return TryCatch<undefined>(async () => {
      const { supabaseUser, cookieStore } = await checkSupabaseCookie()

      const { user } = await getSupabaseUser(supabaseUser)

      let attributes: UserAttributes = {}
      const email = IncomingData.email

      if (user.email !== email) attributes = { email: email }

      delete IncomingData.email

      for (let item in IncomingData) {
         if (user.user_metadata[item] !== IncomingData[item]) {
            Object.assign(attributes, {
               data: IncomingData,
            })
            break
         }
      }

      if (Object.keys(attributes).length <= 0) return { data: undefined }

      const { error } = await supabaseUser.auth.updateUser(attributes)

      if (error) throw error

      return { data: undefined }
   })
}

// export async function UpdateVisitHistory() {
//    return TryCatch<undefined>(async () => {
//       const { supabaseUser, cookieStore } = await checkSupabaseCookie()
//
//       const { user } = await getSupabaseUser(supabaseUser)
//
//
//    })
// }
