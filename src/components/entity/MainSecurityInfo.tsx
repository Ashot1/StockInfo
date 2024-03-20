import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'

export default function MainSecurityInfo({
   currencyList,
   valueIndex,
   titleIndex,
   nameIndex,
}: {
   currencyList: (string | number)[][]
   nameIndex: number
   titleIndex: number
   valueIndex: number
}) {
   return (
      <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
         {currencyList.map((currency) => {
            return (
               <InfoPlaceHolder
                  key={currency[nameIndex]}
                  title={currency[titleIndex] as string}
                  text={currency[valueIndex] as string}
               />
            )
         })}
      </section>
   )
}
