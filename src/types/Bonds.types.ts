export type BondsRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      history: BondsHistory[]
      'history.cursor': BondsCursor[]
   },
]

export type BondsHistory = {
   SHORTNAME: string
   SECID: string
   TRADEDATE: string
   OPEN: number
   CLOSE: number
   MARKETPRICE2: number
   MARKETPRICE3: number
}

export type BondsCursor = {
   INDEX: number
   TOTAL: number
   PAGESIZE: number
}

export type CouponsRequest = [
   {
      charsetinfo: {
         name: 'utf-8'
      }
   },
   {
      coupons: CouponsHistory[]
   },
]

export type CouponsHistory = {
   isin: string
   startdate: string
   coupondate: string
   value_rub: number
   valueprc: number
}
