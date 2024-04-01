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
}
