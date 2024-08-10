'use server'

import {
   type SupabaseClient,
   User,
   UserAttributes,
} from '@supabase/supabase-js'
import { Tables } from '@/types/supabase.types'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { AuthFormPatterns, Start_balance } from '@/utils/config'
import { cache } from 'react'
import { TryCatch } from '@/utils/utils'
import { SupabaseCustomService } from '@/utils/supabase/service'

async function getSessionUser(supabase: SupabaseClient) {
   const {
      data: { session },
      error,
   } = await supabase.auth.getSession()

   if (error) throw error
   const user = session?.user

   if (!user || !user?.id) throw new Error('Пользователь не найден')

   return { user }
}

export async function getSupabaseUser(supabase: SupabaseClient) {
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error) throw error

   if (!user || !user?.id) throw new Error('Пользователь не найден')

   return { user }
}

export async function DeleteUser() {
   return TryCatch<null>(async () => {
      const supabase = SupabaseCustomServer()
      const supabaseServer = SupabaseCustomService()

      const { user } = await getSupabaseUser(supabase)

      const { error: DeleteError } = await supabaseServer.auth.admin.deleteUser(
         user.id
      )

      if (DeleteError) throw DeleteError

      const { error: DeleteMainError } = await supabaseServer
         .from('UserMainData')
         .delete()
         .eq('user_id', user.id)

      const { error: DeleteTransactionsError } = await supabaseServer
         .from('Transactions')
         .delete()
         .eq('user_id', user.id)

      const extension = user.user_metadata.avatar_url.split('.').at(-1)

      const { error: StorageError } = await supabaseServer.storage
         .from('Avatars')
         .remove([`public/${user.id}.${extension}`])

      if (DeleteMainError || DeleteTransactionsError || StorageError)
         throw DeleteMainError || DeleteTransactionsError || StorageError

      const { error } = await supabase.auth.signOut()

      if (error) throw error

      return { data: null, error: null }
   })
}

export async function GetUser() {
   return TryCatch<User>(async () => {
      const supabase = SupabaseCustomServer()

      const { user } = await getSessionUser(supabase)

      return { data: user, error: null }
   })
}

export async function UpdateUser({
   data: IncomingData,
}: {
   data: Record<string, string>
}) {
   return TryCatch<User>(async () => {
      const supabase = SupabaseCustomServer()

      const { user: User } = await getSupabaseUser(supabase)

      let attributes: UserAttributes = {}
      const email = IncomingData.email
      const password = IncomingData.password

      if (User.email !== email) attributes = { ...attributes, email }
      if (
         password &&
         password.length >= AuthFormPatterns.password.minLength.value
      )
         attributes = { ...attributes, password }

      delete IncomingData.email
      delete IncomingData.password

      for (let item in IncomingData) {
         if (User.user_metadata[item] !== IncomingData[item]) {
            Object.assign(attributes, {
               data: IncomingData,
            })
            break
         }
      }

      if (Object.keys(attributes).length <= 0)
         return { data: User, error: null }

      const {
         data: { user },
         error,
      } = await supabase.auth.updateUser(attributes)

      if (error || !user) throw error

      return { data: user, error: null }
   })
}

export const GetUserMainData = async () => {
   return TryCatch<Tables<'UserMainData'>>(
      cache(async () => {
         const supabase = SupabaseCustomServer()

         const { user } = await getSessionUser(supabase)

         const { data, error } = await supabase
            .from('UserMainData')
            .select()
            .eq('user_id', user.id)

         if (error || !data) throw error || new Error('Ошибка получения данных')

         return { data: data[0], error: null }
      })
   )
}

type TincomingData = Partial<Omit<Tables<'UserMainData'>, 'user_id'>>

export async function UpdateUserMainData(incomingData: TincomingData) {
   return TryCatch<Tables<'UserMainData'>>(async () => {
      const supabase = SupabaseCustomServer()

      const { user } = await getSupabaseUser(supabase)
      const { data, error } = await supabase
         .from('UserMainData')
         .upsert(incomingData)
         .eq('user_id', user.id)
         .select()

      if (!data || error) throw error || new Error('Ошибка обновления')

      return { data: data[0], error: null }
   })
}

type TgetTransaction = { data: Tables<'Transactions'>[]; count: number | null }

export async function getAllUserTransactions(option?: {
   column: keyof Tables<'Transactions'>
   value: string | number
}) {
   return TryCatch<TgetTransaction>(async () => {
      const supabase = SupabaseCustomServer()

      const { user } = await getSupabaseUser(supabase)

      const supabaseService = SupabaseCustomService()

      let request
      if (option?.column) {
         request = supabaseService
            .from('Transactions')
            .select()
            .eq('user_id', user.id)
            .eq(option.column, option.value)
            .order('created_at', { ascending: false })
      } else {
         request = supabaseService
            .from('Transactions')
            .select()
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
      }
      const { data, error, count } = await request

      if (!data || error)
         throw error || new Error('Ошибка получения транзакций')

      return { data: { data, count }, error: null }
   })
}

export async function getActualUserTransactions() {
   return TryCatch<TgetTransaction>(async () => {
      const supabase = SupabaseCustomServer()

      const { user } = await getSupabaseUser(supabase)

      const supabaseService = SupabaseCustomService()
      const { data, error, count } = await supabaseService
         .from('Transactions')
         .select()
         .eq('user_id', user.id)
         .gt('remainder', 0)
         .eq('transaction_type', 'buy')

      if (!data || error)
         throw error || new Error('Ошибка получения транзакций')

      return { data: { data, count }, error: null }
   })
}

export async function clearUserTransactions() {
   return TryCatch<Tables<'UserMainData'>>(async () => {
      const { data, error } = await UpdateUserMainData({
         current_money: Start_balance,
         start_money: Start_balance,
         purchases: [],
      })

      if (error || !data) throw new Error(error || 'Ошибка обновления данных')

      const supabase = SupabaseCustomServer()
      const { user } = await getSupabaseUser(supabase)
      const supabaseService = SupabaseCustomService()

      const { error: TransactionError } = await supabaseService
         .from('Transactions')
         .delete()
         .eq('user_id', user.id)

      if (TransactionError) throw TransactionError

      return { data: data, error: null }
   })
}

export async function CreateTable(id: string) {
   return TryCatch(async () => {
      const supabaseServer = SupabaseCustomService()

      const { data, error } = await supabaseServer
         .from('UserMainData')
         .insert({
            user_id: id,
            start_money: Start_balance,
            current_money: Start_balance,
         })
         .select()

      if (error || !data) throw error || new Error('Ошибка создания таблицы')

      return { data: data, error: null }
   })
}
