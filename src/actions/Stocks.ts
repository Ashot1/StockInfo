'use server'

import TryCatch from '@/utils/TryCatch'
import {
   CurrentStockRequest,
   DividendsRequest,
   StocksRequest,
} from '@/types/Stocks.types'
import { SecuritySearchRequest } from '@/types/Security.types'

export async function getStocksList(start: string = '0', limit: number) {
   return TryCatch<StocksRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities.json?start=${start}&limit=${limit}&iss.meta=off&iss.data=on`,
         { cache: 'no-store' }
      )
      const data: StocksRequest = await result.json()

      if (!result || !data) throw new Error('Акции не найдены')

      return { data }
   })
}

export async function getCurrentStock(stock: string) {
   return TryCatch<CurrentStockRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${stock}.json?iss.meta=off`
      )
      const data: CurrentStockRequest = await result.json()

      if (!result || !data || !data.description.data.length)
         throw new Error('Акция не найдена')

      return { data }
   })
}

export async function getDividends(stock: string) {
   return TryCatch<DividendsRequest>(async () => {
      const result = await fetch(
         `http://iss.moex.com/iss/securities/${stock}/dividends.json?iss.meta=off`
      )

      const data: DividendsRequest = await result.json()

      if (!result || !data || !data.dividends.data.length)
         throw new Error('Выплат не было')

      return { data }
   })
}

export async function searchStock(stock: string) {
   return TryCatch<SecuritySearchRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities.json?q=${stock}&iss.meta=off&iss.json=extended&securities.columns=secid,shortname,is_traded&engine=stock&market=shares`
      )
      const data: SecuritySearchRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка запроса')

      return { data: data }
   })
}
