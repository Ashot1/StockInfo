export type BondsRequest = {
   history: {
      columns: BondsColumns
      data: (string | number | null)[][]
   }
   'history.cursor': {
      columns: BondsCursorColumns
      data: number[][]
   }
}

export type BondsColumns = [
   'BOARDID',
   'TRADEDATE',
   'SHORTNAME',
   'SECID',
   'NUMTRADES',
   'VALUE',
   'LOW',
   'HIGH',
   'CLOSE',
   'LEGALCLOSEPRICE',
   'ACCINT',
   'WAPRICE',
   'YIELDCLOSE',
   'OPEN',
   'VOLUME',
   'MARKETPRICE2',
   'MARKETPRICE3',
   'ADMITTEDQUOTE',
   'MP2VALTRD',
   'MARKETPRICE3TRADESVALUE',
   'ADMITTEDVALUE',
   'MATDATE',
   'DURATION',
   'YIELDATWAP',
   'IRICPICLOSE',
   'BEICLOSE',
   'COUPONPERCENT',
   'COUPONVALUE',
   'BUYBACKDATE',
   'LASTTRADEDATE',
   'FACEVALUE',
   'CURRENCYID',
   'CBRCLOSE',
   'YIELDTOOFFER',
   'YIELDLASTCOUPON',
   'OFFERDATE',
   'FACEUNIT',
   'TRADINGSESSION',
]

export type BondsCursorColumns = ['INDEX', 'TOTAL', 'PAGESIZE']
