'use server'

import { LoginPasswordInfo, RegisterPasswordInfo } from '@/types/Auth.types'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { TryCatch } from '@/utils/utils'
import { CreateTable, DeleteUser } from '@/actions/Account/Account'
import { User } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase.types'

export async function LoginWithPassword({
   password,
   email,
}: LoginPasswordInfo) {
   return TryCatch<User>(async () => {
      const supabase = await SupabaseCustomServer()
      const { error, data } = await supabase.auth.signInWithPassword({
         password: password,
         email: email,
      })
      if (error) throw error

      return { data: data.user }
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

      if (error || !data || !data.user?.id)
         throw error || new Error('Ошибка регистрации')

      const { error: TableError, data: TableData } = await CreateTable(
         data.user.id
      )

      if (TableError) {
         await DeleteUser()
         throw TableError
      }

      if (!TableData) throw new Error('Ошибка получения таблицы')

      return { data: { user: data.user, table: TableData[0] } }
   })
}

export async function SignOut() {
   return TryCatch(async () => {
      const supabase = SupabaseCustomServer()

      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error

      return { data: undefined }
   })
}
