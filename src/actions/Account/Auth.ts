'use server'

import { LoginPasswordInfo, RegisterPasswordInfo } from '@/types/Auth.types'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { TryCatch } from '@/utils/utils'
import { CreateTable, DeleteUser } from '@/actions/Account/Account'
import { User } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase.types'
import { OAuthProviders } from '@/types/Auth.types'

export async function LoginWithOAuth(provider: OAuthProviders) {
   return TryCatch(async () => {
      const supabase = SupabaseCustomServer()

      const response = await supabase.auth.signInWithOAuth({
         provider: provider,
         options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITEURL!}/front/auth/callback`,
         },
      })

      if (response?.error) throw response?.error

      return { data: response?.data, error: null }
   })
}

export async function LoginWithPassword({
   password,
   email,
}: LoginPasswordInfo) {
   return TryCatch<User>(async () => {
      const supabase = SupabaseCustomServer()
      const { error, data } = await supabase.auth.signInWithPassword({
         password: password,
         email: email,
      })
      if (error) throw error

      return { data: data.user, error: null }
   })
}

export async function RegisterWithPassword({
   password,
   email,
   metadata,
}: RegisterPasswordInfo) {
   return TryCatch<{ user: User; table: Tables<'UserMainData'> }>(async () => {
      const supabase = SupabaseCustomServer()

      const { error, data } = await supabase.auth.signUp({
         email: email,
         password: password,
         options: {
            data: metadata,
         },
      })

      if (error || !data || !data?.user?.id)
         throw error || new Error('Ошибка регистрации')

      const { error: TableError, data: TableData } = await CreateTable(
         data.user.id
      )

      if (TableError) {
         await DeleteUser()
         throw TableError
      }

      if (!TableData) throw new Error('Ошибка получения таблицы')

      return {
         data: { user: data.user, table: TableData[0] },
         error: null,
      }
   })
}

export async function SignOut() {
   return TryCatch<null>(async () => {
      const supabase = SupabaseCustomServer()

      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error

      return { data: null, error: null }
   })
}
