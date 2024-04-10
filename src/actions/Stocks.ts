'use server'

import TryCatch from '@/utils/TryCatch'
import {
   CurrentStockRequest,
   DividendsRequest,
   StocksRequest,
} from '@/types/Stocks.types'
import { SecurityGetAllRequest } from '@/types/Security.types'

export async function getStocksList(start: string = '0', limit: number) {
   return TryCatch<StocksRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities.json?start=${start}&limit=${limit}&iss.meta=off&iss.data=on&iss.json=extended&history.columns=SHORTNAME,SECID,MARKETPRICE2,MARKETPRICE3,CLOSE,OPEN`,
         { next: { revalidate: 3600 } }
      )
      const data: StocksRequest = await result.json()

      if (!result || !data) throw new Error('Акции не найдены')

      return { data }
   })
}

export async function getCurrentStock(stock: string) {
   return TryCatch<CurrentStockRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${stock}.json?iss.meta=off&iss.json=extended&iss.only=description`,
         { next: { revalidate: 60 } }
      )
      const data: CurrentStockRequest = await result.json()

      if (!result || !data || !data[1].description.length)
         throw new Error('Акция не найдена')

      return { data }
   })
}

export async function getDividends(stock: string) {
   return TryCatch<DividendsRequest>(async () => {
      const result = await fetch(
         `http://iss.moex.com/iss/securities/${stock}/dividends.json?iss.meta=off&iss.json=extended`,
         { next: { revalidate: 3600 } }
      )

      const data: DividendsRequest = await result.json()

      if (!result || !data || !data[1].dividends.length)
         throw new Error('Выплат не было')

      return { data }
   })
}

export async function getAllStocks(
   list: String[],
   limit?: string,
   start?: string
) {
   return TryCatch<SecurityGetAllRequest>(async () => {
      let optional = ''
      limit && (optional += `&limit=${limit}`)
      start && (optional += `&start=${start}`)

      if (list.length <= 0) throw new Error('Список пуст')

      const formatedList = list.join(',')

      const result = await fetch(
         `http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?securities=${formatedList}&iss.json=extended&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,SECNAME&marketdata.columns=SECID,OPEN,LOW,HIGH,LAST,UPDATETIME${optional}`,
         { next: { revalidate: 3600 } }
      )
      const data: SecurityGetAllRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка запроса')

      return { data: data }
   })
}
