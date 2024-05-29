'use client'

import { TryCatch } from '@/utils/utils'
import {
   SecurityGetAllRequest,
   SecuritySearchRequest,
} from '@/types/Security.types'

export async function searchStock(
   stock: string,
   limit?: string,
   start?: string
) {
   return TryCatch<SecuritySearchRequest>(async () => {
      let optional = ''
      limit && (optional += `&limit=${limit}`)
      start && (optional += `&start=${start}`)

      const result = await fetch(
         `https://iss.moex.com/iss/securities.json?q=${stock}&iss.meta=off&iss.json=extended&securities.columns=secid,shortname,is_traded&engine=stock&market=shares${optional}`
      )
      const data: SecuritySearchRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка запроса')

      return { data: data }
   })
}

export async function searchBond(bond: string, limit?: string, start?: string) {
   return TryCatch<SecuritySearchRequest>(async () => {
      let optional = ''
      limit && (optional += `&limit=${limit}`)
      start && (optional += `&start=${start}`)

      const result = await fetch(
         `https://iss.moex.com/iss/securities.json?q=${bond}&iss.meta=off&iss.json=extended&securities.columns=secid,shortname,is_traded&engine=stock&market=bonds${optional}`
      )
      const data: SecuritySearchRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка запроса')

      return { data: data }
   })
}
