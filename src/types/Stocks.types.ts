export type StocksRequest = {
   history: {
      columns: StocksColumns
      data: (string | number)[][]
   }
   'history.cursor': {
      columns: StocksCursorColumns
      data: number[][]
   }
}

export type StocksColumns = [
   'BOARDID',
   'TRADEDATE',
   'SHORTNAME',
   'SECID',
   'NUMTRADES',
   'VALUE',
   'OPEN',
   'LOW',
   'HIGH',
   'LEGALCLOSEPRICE',
   'WAPRICE',
   'CLOSE',
   'VOLUME',
   'MARKETPRICE2',
   'MARKETPRICE3',
   'ADMITTEDQUOTE',
   'MP2VALTRD',
   'MARKETPRICE3TRADESVALUE',
   'ADMITTEDVALUE',
   'WAVAL',
   'TRADINGSESSION',
   'CURRENCYID',
   'TRENDCLSPR',
]

export type StocksCursorColumns = ['INDEX', 'TOTAL', 'PAGESIZE']

export type CurrentStockRequest = {
   description: {
      columns: Current_Stocks_Description_Columns
      data: (string | number)[][]
   }
   boards: {
      columns: Current_Stocks_boards_Columns
      data: (string | number)[][]
   }
}

export type Current_Stocks_Description_Columns = [
   'name',
   'title',
   'value',
   'type',
   'sort_order',
   'is_hidden',
   'precision',
]

export type Current_Stocks_boards_Columns = [
   'secid',
   'boardid',
   'title',
   'board_group_id',
   'market_id',
   'market',
   'engine_id',
   'engine',
   'is_traded',
   'decimals',
   'history_from',
   'history_till',
   'listed_from',
   'listed_till',
   'is_primary',
   'currencyid',
]

export type DividendsRequest = {
   dividends: {
      columns: DividendsColumns
      data: (string | number)[][]
   }
}

export type DividendsColumns = [
   'secid',
   'isin',
   'registryclosedate',
   'value',
   'currencyid',
]
