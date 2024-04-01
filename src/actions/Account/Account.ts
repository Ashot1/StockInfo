'use server'

import { type SupabaseClient, UserAttributes } from '@supabase/supabase-js'
import TryCatch from '@/utils/TryCatch'
import { Tables } from '@/types/supabase.types'
import { TFavoritesList, FavoritesListTypes } from '@/types/Auth.types'
import { getAllStocks } from '@/actions/Stocks'
import { TFormatedFavoriteList } from '@/components/widgets/FavoriteList'
import {
   SecurityGetAllData,
   SecurityGetAllMarket,
} from '@/types/Security.types'
import { getAllBonds } from '@/actions/Bonds'
import { type User } from '@supabase/gotrue-js'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { URLList } from '@/utils/const'
import { cache } from 'react'

async function getSupabaseUser(supabase: SupabaseClient) {
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error) throw error

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

      const { user: User } = await getSupabaseUser(supabase)

      return { data: User }
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

export async function FetchFavorites(list: TFavoritesList[]) {
   return TryCatch<TFormatedFavoriteList[]>(async () => {
      if (!list || list.length <= 0)
         throw new Error('Вы еще ничего не добавили')

      const SortedList: { [key in FavoritesListTypes]: string[] } = {
         Bond: [],
         Currency: [],
         News: [],
         Stock: [],
      }

      for (let i of list) {
         const type = i.type as FavoritesListTypes
         SortedList[type].push(i.secID)
      }

      let Securities: {
         securities: SecurityGetAllData[]
         marketdata: SecurityGetAllMarket[]
      } = {
         securities: [],
         marketdata: [],
      }

      const fetchData = async ({
         name,
         fn,
         list,
      }: {
         list: string[]
         name: FavoritesListTypes
         fn: typeof getAllStocks
      }) => {
         if (SortedList[name].length <= 0) return
         const { data, error } = await fn(list)

         if (!data || error) throw new Error(error || 'Ошибка получения данных')

         Securities.securities = Securities.securities.concat(
            data[1].securities
         )
         Securities.marketdata = Securities.marketdata.concat(
            data[1].marketdata
         )
      }

      const stocksReq = fetchData({
         name: 'Stock',
         list: SortedList.Stock,
         fn: getAllStocks,
      })
      const bondsReq = fetchData({
         name: 'Bond',
         list: SortedList.Bond,
         fn: getAllBonds,
      })
      await Promise.all([stocksReq, bondsReq])

      const mainSecData = Securities.securities
      const prices = Securities.marketdata

      const formated: TFormatedFavoriteList[] = mainSecData.map((current) => {
         const supabaseData = list.find((item) => item.secID === current.SECID)
         const marketData = prices.find((item) => item.SECID === current.SECID)
         let definition = undefined

         if (marketData?.LAST && marketData?.OPEN) {
            definition =
               ((marketData.LAST - marketData.OPEN) /
                  ((marketData.OPEN + marketData.LAST) / 2)) *
               100
         }

         return {
            SECID: current.SECID,
            SHORTNAME: current.SHORTNAME,
            image: supabaseData ? supabaseData.image : current.SECID,
            type: supabaseData ? supabaseData.type : 'Stock',
            price: marketData?.LAST,
            definition: definition,
         }
      })

      return { data: formated }
   })
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
