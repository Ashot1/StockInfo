import { TryCatch } from '@/utils/utils'
import { BondsRequest, CouponsRequest } from '@/types/Bonds.types'
import {
   MarketPriceRequest,
   PriceHistoryReqProps,
   SecurityGetAllRequest,
   SecurityPriceHistoryRequest,
} from '@/types/Security.types'

export async function getBondsList(start: string = '0', limit: number) {
   return TryCatch<BondsRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/history/engines/stock/markets/bonds/securities.json?start=${start}&limit=${limit}&iss.meta=off&iss.json=extended&history.columns=SHORTNAME,SECID,TRADEDATE,OPEN,CLOSE,MARKETPRICE2,MARKETPRICE3&numtrades=1`
      )
      const data: BondsRequest = await result.json()

      if (!result || !data) throw new Error('Облигации не найдены')

      return { data: data, error: null }
   })
}

export async function getCoupons(bond: string) {
   return TryCatch<CouponsRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${bond}/bondization.json?iss.meta=off&iss.json=extended&iss.only=coupons&coupons.columns=isin,startdate,coupondate,value_rub,valueprc`,
         { next: { revalidate: 3600 } }
      )
      const data: CouponsRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

      return { data: data, error: null }
   })
}

export async function getAllBonds(
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
         `https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json?securities=${formatedList}&iss.json=extended&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,SHORTNAME,SECNAME&marketdata.columns=SECID,OPEN,LOW,HIGH,LAST,UPDATETIME,MARKETPRICE${optional}`
      )
      const data: SecurityGetAllRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка запроса')

      return { data: data, error: null }
   })
}

export async function getBondPriceHistory({
   from,
   start = 0,
   interval = 24,
   stock,
   till,
}: PriceHistoryReqProps) {
   return TryCatch<SecurityPriceHistoryRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/engines/stock/markets/bonds/securities/${stock}/candles.json?iss.meta=off&iss.json=extended&interval=${interval}&start=${start}&from=${from}${
            till && `&till=${till}`
         }&candles.columns=open,close,high,low,begin,end`,
         { next: { revalidate: 3600 } }
      )

      const data: SecurityPriceHistoryRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

      return { data, error: null }
   })
}

export async function getBondMarketPrice(secid: string[]) {
   return TryCatch<MarketPriceRequest>(async () => {
      const secs = secid.join(',')

      const result = await fetch(
         `https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json?iss.meta=off&iss.json=extended&securities=${secs}&iss.only=securities,marketdata&securities.columns=SECID&marketdata.columns=SECID,OPEN,LOW,HIGH,LAST,UPDATETIME,MARKETPRICE`
      )

      const data: MarketPriceRequest = await result.json()

      if (!result || !data) throw new Error('Ошибка получения данных')

      return { data: data, error: null }
   })
}
