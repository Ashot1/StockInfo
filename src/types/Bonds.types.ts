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

export type CouponsRequest = {
   amortizations: {
      columns: CouponsAmortizationColumns
      data: (string | number | null)[][]
   }
   coupons: {
      columns: CouponsColumns
      data: (string | number | null)[][]
   }
   offers: {
      columns: CouponsOffersColumns
      data: (string | number | null)[][]
   }
}

type CouponsAmortizationColumns = [
   'isin',
   'name',
   'issuevalue',
   'amortdate',
   'facevalue',
   'initialfacevalue',
   'faceunit',
   'valueprc',
   'value',
   'value_rub',
   'data_source',
   'secid',
   'primary_boardid',
]

type CouponsColumns = [
   'isin',
   'name',
   'issuevalue',
   'coupondate',
   'recorddate',
   'startdate',
   'initialfacevalue',
   'facevalue',
   'faceunit',
   'value',
   'valueprc',
   'value_rub',
   'secid',
   'primary_boardid',
]

type CouponsOffersColumns = [
   'isin',
   'name',
   'issuevalue',
   'offerdate',
   'offerdatestart',
   'offerdateend',
   'facevalue',
   'faceunit',
   'price',
   'value',
   'agent',
   'offertype',
   'secid',
   'primary_boardid',
]
