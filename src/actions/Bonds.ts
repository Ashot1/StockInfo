'use server'

import TryCatch from '@/utils/TryCatch'
import { BondsRequest } from '@/types/Bonds.types'

export async function getBondsList(start: string = '0', limit: number) {
   return TryCatch<BondsRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/history/engines/stock/markets/bonds/securities.json?start=${start}&limit=${limit}&iss.meta=off`,
         { cache: 'no-store' }
      )
      const data = await result.json()

      if (!result || !data) throw new Error('Облигации не найдены')

      return { data: data }
   })
}
