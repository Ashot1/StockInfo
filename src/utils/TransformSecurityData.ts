import { CurrentStockRequest } from '@/types/Stocks.types'

const TransformSecurityData = (data: CurrentStockRequest, secID: string) => {
   const StockInfoCol = data.description.columns
   const StockInfoData = data.description.data

   const titleIndex = StockInfoCol.indexOf('title')
   const valueIndex = StockInfoCol.indexOf('value')
   const nameIndex = StockInfoCol.indexOf('name')
   const title = StockInfoData.find((item) => item[nameIndex] === 'NAME')
   const code = StockInfoData.find((item) => item[nameIndex] === 'SECID')

   return { StockInfoData, titleIndex, valueIndex, nameIndex, title, code }
}

export default TransformSecurityData
