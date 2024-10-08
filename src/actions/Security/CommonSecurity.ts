import { CurrentStockRequest } from '@/types/Stocks.types'
import { FavoritesListTypes, TFavoritesList } from '@/types/Auth.types'
import { getCurrentNews } from '@/actions/Security/News'
import { TFormatedFavoriteList } from '@/components/module/Favorite'
import {
   SecurityGetAllData,
   SecurityGetAllMarket,
} from '@/types/Security.types'
import { getAllStocks } from '@/actions/Security/Stocks'
import { getAllBonds } from '@/actions/Security/Bonds'
import { ConvertDate } from '@/utils/Date'
import { getCurrency } from '@/actions/Security/Currency'
import {
   calculateDefinition,
   SortBySecurityType,
   TryCatch,
} from '@/utils/utils'

export async function getCurrentSecurity(stock: string) {
   return TryCatch<CurrentStockRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${stock}.json?iss.meta=off&iss.json=extended&iss.only=description`,
         { next: { revalidate: 60 } }
      )
      const data: CurrentStockRequest = await result.json()

      if (!result || !data || !data[1].description.length)
         throw new Error('Акция не найдена')

      return { data, error: null }
   })
}

export async function FetchInfo(list?: TFavoritesList[] | null) {
   return TryCatch<TFormatedFavoriteList[]>(async () => {
      if (!list || list.length <= 0) return { data: [], error: null }

      const SortedList = SortBySecurityType(list)

      let Securities: {
         securities: SecurityGetAllData[]
         marketdata: SecurityGetAllMarket[]
      } = {
         securities: [],
         marketdata: [],
      }

      // fetch data
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

      const newsGetAll = async () => {
         for (const item of SortedList.News) {
            const { error, data } = await getCurrentNews(item)
            if (!data || error)
               throw new Error(error || 'Ошибка получения данных')

            const NewsInfo = data[1].content[0]

            Securities.securities.push({
               SECID: `${NewsInfo.id}`,
               SHORTNAME: NewsInfo.title,
               SECNAME: ConvertDate(NewsInfo.published_at),
            })
            Securities.marketdata.push({
               LAST: 0,
               OPEN: 0,
               HIGH: 0,
               LOW: 0,
               SECID: `${NewsInfo.id}`,
               UPDATETIME: NewsInfo.published_at,
               MARKETPRICE: 0,
            })
         }
      }

      const currencyGetAll = async () => {
         const { error, data } = await getCurrency()
         if (!data || error) throw new Error(error || 'Ошибка получения данных')

         for (const secID of SortedList.Currency) {
            const Currency = data.Valute[secID]

            Securities.securities.push({
               SECID: secID,
               SECNAME: Currency.CharCode,
               SHORTNAME: Currency.Name,
            })
            Securities.marketdata.push({
               SECID: secID,
               HIGH: 0,
               OPEN: Currency.Previous,
               LAST: Currency.Value,
               LOW: 0,
               UPDATETIME: '',
               MARKETPRICE: Currency.Value,
            })
         }
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
      const newsReq = newsGetAll()
      const currencyReq = currencyGetAll()

      await Promise.all([stocksReq, bondsReq, newsReq, currencyReq])

      const mainSecData = Securities.securities
      const prices = Securities.marketdata

      // formatting data
      const formated: TFormatedFavoriteList[] = mainSecData.map((current) => {
         const supabaseData = list.find((item) => item.secID === current.SECID)
         const marketData = prices.find((item) => item.SECID === current.SECID)
         let definition = undefined

         if (marketData)
            definition = calculateDefinition(
               marketData.OPEN,
               marketData.MARKETPRICE || marketData.LAST
            )

         return {
            SECID: current.SECID,
            SHORTNAME: current.SHORTNAME,
            SECNAME: current.SECNAME,
            image: supabaseData?.image || current.SECID,
            type: supabaseData?.type || 'Stock',
            price: marketData?.MARKETPRICE || marketData?.LAST,
            definition: definition,
         }
      })

      return { data: formated, error: null }
   })
}
