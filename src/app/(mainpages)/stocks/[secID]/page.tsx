import BackButton from '@/components/entity/BackButton'
import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { getCurrentStock } from '@/actions/Stocks'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import Image from 'next/image'
import ArrowSeparator from '@/components/ui/ArrowSeparator'
import IMGcolorCard from '@/components/ui/IMGcolorCard'
import IMGshadowCard from '@/components/ui/IMGshadowCard'
import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'

export default async function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentStock(secID)

   if (!data || error)
      return <ErrorMessage errMessage={error || 'Акция не найдена'} />

   if (!data.description.data.length) {
      redirect(URLList.notFound)
      return
   }

   const StockInfoCol = data.description.columns
   const StockInfoData = data.description.data

   const titleIndex = StockInfoCol.indexOf('title')
   const valueIndex = StockInfoCol.indexOf('value')
   const nameIndex = StockInfoCol.indexOf('name')
   const title = StockInfoData.find((item) => item[nameIndex] === 'NAME')
   const code = StockInfoData.find((item) => item[nameIndex] === 'SECID')
   const img = `/Logos/${secID}.svg`

   if (!title || !code) return

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <div className="animate-appearance">
            <div className="mb-10 grid w-full place-items-center">
               <BackButton />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4 768p:flex-row 768p:justify-center">
               <IMGshadowCard img={img} className="relative size-20">
                  <Image
                     src={img}
                     alt={secID}
                     fill
                     className="rounded-2xl bg-gray-500"
                  />
               </IMGshadowCard>
               <span className="text-center">
                  <p className="mb-1 text-sm 768p:text-base">
                     {title[valueIndex]}
                  </p>
                  <p className="text-xs opacity-45 768p:text-sm">
                     {code[valueIndex]}
                  </p>
               </span>
            </div>
            <ArrowSeparator />
            <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
               {StockInfoData.map((stock) => {
                  return (
                     <InfoPlaceHolder
                        key={stock[nameIndex]}
                        title={stock[titleIndex] as string}
                        text={stock[valueIndex] as string}
                     />
                  )
               })}
            </section>
         </div>
      </Suspense>
   )
}
