export type SecuritySearchRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      securities: SecuritySearchData[]
   },
]

export type SecuritySearchData = {
   secid: string
   shortname: string
   is_traded: 1 | 0
}

export type SecurityGetAllRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      securities: SecurityGetAllData[]
      marketdata: SecurityGetAllMarket[]
   },
]

export type SecurityGetAllData = {
   SECID: string
   SHORTNAME: string
   SECNAME: string
}
export type SecurityGetAllMarket = {
   SECID: string
   OPEN: number
   LOW: number
   HIGH: number
   LAST: number
   UPDATETIME: string
   MARKETPRICE: number
}

export type SecurityPriceHistoryRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      candles: PriceHistoryType[]
   },
]

export type PriceHistoryType = {
   open: number
   close: number
   high: number
   low: number
   begin: string
   end: string
}

export type PriceHistoryReqProps = {
   stock: string
   from: string
   till?: string
   interval?: number | string
   start?: number | string
}

export type MarketPriceRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      securities: [
         {
            SECID: string
         },
      ]
      marketdata: [
         {
            SECID: string
            OPEN: number
            LOW: number
            HIGH: number
            LAST: number
            UPDATETIME: string
            MARKETPRICE: number
         },
      ]
   },
]
