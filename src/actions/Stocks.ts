'use server'

import TryCatch from '@/utils/TryCatch'
import {
   CurrentStockRequest,
   DividendsRequest,
   StocksRequest,
} from '@/types/Stocks.types'
import {
   MarketPriceRequest,
   PriceListReqProps,
   SecurityGetAllRequest,
   SecurityPriceListRequest,
} from '@/types/Security.types'
import exp from 'node:constants'

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

export async function getDividends(stock: string) {
   return TryCatch<DividendsRequest>(async () => {
      const result = await fetch(
         `http://iss.moex.com/iss/securities/${stock}/dividends.json?iss.meta=off&iss.json=extended`,
         { next: { revalidate: 3600 } }
      )

      const data: DividendsRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

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

export async function getStockPriceList({
   from,
   start = 0,
   interval = 24,
   stock,
   till,
}: PriceListReqProps) {
   return TryCatch<SecurityPriceListRequest>(async () => {
      const result = await fetch(
         `http://iss.moex.com/iss/engines/stock/markets/shares/securities/${stock}/candles.json?iss.meta=off&iss.json=extended&interval=${interval}&start=${start}&from=${from}${
            till && `&till=${till}`
         }&candles.columns=open,close,high,low,begin,end`,
         { next: { revalidate: 3600 } }
      )

      const data: SecurityPriceListRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

      return { data }
   })
}

export async function getStockMarketPrice(secid: string) {
   return TryCatch<MarketPriceRequest>(async () => {
      const result = await fetch(
         `http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&iss.json=extended&securities=${secid}&iss.only=securities,marketdata&securities.columns=SECID&marketdata.columns=SECID,OPEN,LOW,HIGH,LAST,UPDATETIME`,
         { next: { revalidate: 1800 } }
      )

      const data: MarketPriceRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

      return { data: data }
   })
}
