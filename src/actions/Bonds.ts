'use server'

import TryCatch from '@/utils/TryCatch'
import { BondsRequest, CouponsRequest } from '@/types/Bonds.types'

export async function getBondsList(start: string = '0', limit: number) {
   return TryCatch<BondsRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/history/engines/stock/markets/bonds/securities.json?start=${start}&limit=${limit}&iss.meta=off`,
         { cache: 'no-store' }
      )
      const data: BondsRequest = await result.json()

      if (!result || !data) throw new Error('Облигации не найдены')

      return { data: data }
   })
}

export async function getCoupons(bond: string) {
   return TryCatch<CouponsRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${bond}/bondization.json?iss.meta=off`
      )
      const data: CouponsRequest = await result.json()

      if (!result || !data || !data.coupons.data.length)
         throw new Error('Купонов нет')

      return { data: data }
   })
}
