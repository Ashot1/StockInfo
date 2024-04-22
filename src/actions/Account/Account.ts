'use server'

import { type SupabaseClient, UserAttributes } from '@supabase/supabase-js'
import TryCatch from '@/utils/TryCatch'
import { Tables } from '@/types/supabase.types'
import { type User } from '@supabase/gotrue-js'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { URLList } from '@/utils/const'
import { cache } from 'react'

async function getSupabaseUser(supabase: SupabaseClient) {
   const {
      data: { session },
      error,
   } = await supabase.auth.getSession()

   if (error) throw error

   const user = session?.user

   if (!user || !user?.id) throw new Error('Пользователь не найден')

   return { user }
}

export async function DeleteUser() {
   return TryCatch<undefined>(async () => {
      const supabase = SupabaseCustomServer()
      const supabaseServer = SupabaseCustomServer(true)

      const user = await getSupabaseUser(supabase)

      const { error: DeleteError } = await supabaseServer.auth.admin.deleteUser(
         user.user.id
      )

      if (DeleteError) throw DeleteError

      revalidatePath(URLList.home)

      return { data: undefined }
   })
}

export async function GetUser() {
   return TryCatch<User>(async () => {
      const supabase = SupabaseCustomServer()

      const { user } = await getSupabaseUser(supabase)

      return { data: user }
   })
}

export async function UpdateUser({
   data: IncomingData,
}: {
   data: { [key: string]: string }
}) {
   return TryCatch<undefined>(async () => {
      const supabase = SupabaseCustomServer()

      const { user: User } = await getSupabaseUser(supabase)

      let attributes: UserAttributes = {}
      const email = IncomingData.email

      if (User.email !== email) attributes = { email: email }

      delete IncomingData.email

      for (let item in IncomingData) {
         if (User.user_metadata[item] !== IncomingData[item]) {
            Object.assign(attributes, {
               data: IncomingData,
            })
            break
         }
      }

      if (Object.keys(attributes).length <= 0) return { data: undefined }

      const { error } = await supabase.auth.updateUser(attributes)

      if (error) throw error

      revalidatePath(URLList.home)

      return { data: undefined }
   })
}

export const GetUserMainData = async () => {
   return TryCatch(
      cache(async () => {
         const supabase = SupabaseCustomServer()

         const { user } = await getSupabaseUser(supabase)

         const { data, error } = await supabase
            .from('UserMainData')
            .select()
            .eq('user_id', user.id)

         if (error || !data) throw error || new Error('Ошибка получения данных')

         return { data: data[0] }
      })
   )
}

type TincomingData = Partial<Omit<Tables<'UserMainData'>, 'user_id'>>

export async function UpdateUserMainData(incomingData: TincomingData) {
   return TryCatch(async () => {
      const supabase = SupabaseCustomServer()
      const supabaseServer = SupabaseCustomServer(true)

      const { user } = await getSupabaseUser(supabase)
      const { data, error } = await supabaseServer
         .from('UserMainData')
         .update(incomingData)
         .eq('user_id', user.id)
         .select()

      if (!data || error) throw error || new Error('Ошибка обновления')

      return { data: data[0] }
   })
}

export async function CreateTable(id: string) {
   return TryCatch(async () => {
      const supabaseServer = SupabaseCustomServer(true)

      const { data, error } = await supabaseServer
         .from('UserMainData')
         .upsert({ user_id: id })
         .select()

      if (error || !data) throw error || new Error('Ошибка создания таблицы')

      return { data: data }
   })
}
