export type StocksRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      history: StockHistory[]
      'history.cursor': StockCursor[]
   },
]

export type StockHistory = {
   SHORTNAME: string
   SECID: string
   MARKETPRICE2: number
   MARKETPRICE3: number
   CLOSE: number
   OPEN: number
}

export type StockCursor = { INDEX: number; TOTAL: number; PAGESIZE: number }

export type CurrentStockRequest = [
   {
      charsetinfo: {
         name: string
      }
   },
   {
      description: CurrentStockDescription[]
   },
]

export type CurrentStockDescription = {
   name: string
   title: string
   value: string
   type: string
   sort_order: number
   is_hidden: number
   precision: null | number
}

export type DividendsRequest = [
   {
      charsetinfo: {
         name: 'utf-8'
      }
   },
   { dividends: DividendsHistory[] },
]
//    {
//    dividends: {
//       columns: DividendsColumns
//       data: (string | number)[][]
//    }
// }

export type DividendsHistory = {
   secid: string
   isin: string
   registryclosedate: string
   value: number
   currencyid: string
}
