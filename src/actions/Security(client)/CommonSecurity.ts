import { CurrentStockRequest } from '@/types/Stocks.types'
import { TryCatch } from '@/utils/utils'

export async function getCurrentSecurity(stock: string) {
   return TryCatch<CurrentStockRequest>(async () => {
      const result = await fetch(
         `https://iss.moex.com/iss/securities/${stock}.json?iss.meta=off&iss.json=extended&iss.only=description`,
         { next: { revalidate: 60 } }
      )
      const data: CurrentStockRequest = await result.json()

      if (!result || !data || !data[1].description.length)
         throw new Error('Акция не найдена')

      return { data }
   })
}
