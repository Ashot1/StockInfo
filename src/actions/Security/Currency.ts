import { TryCatch } from '@/utils/utils'
import { CurrencyListRequest } from '@/types/Currency.types'

export async function getCurrency() {
   return TryCatch(async () => {
      const result = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`, {
         next: { revalidate: 3600 },
      })
      const data: CurrencyListRequest = await result.json()

      if (!result || !data) throw new Error('Акции не найдены')

      return { data, error: null }
   })
}
