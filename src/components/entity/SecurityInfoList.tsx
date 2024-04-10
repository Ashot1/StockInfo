import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'
import { CurrentStockDescription } from '@/types/Stocks.types'

export default function SecurityInfoList({
   currencyList,
}: {
   currencyList: CurrentStockDescription[]
}) {
   return (
      <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
         {currencyList.map((currency) => {
            return (
               <InfoPlaceHolder
                  key={currency.name}
                  title={currency.title}
                  text={currency.value}
               />
            )
         })}
      </section>
   )
}
