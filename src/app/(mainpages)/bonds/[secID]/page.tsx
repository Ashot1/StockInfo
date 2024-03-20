import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { getCurrentStock } from '@/actions/Stocks'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import IMGshadowCard from '@/components/ui/Img/IMGshadowCard'
import ImageServerErrorCheck from '@/components/ui/Img/ImageServerErrorCheck'
import ControlPanel from '@/components/widgets/ControlPanel'
import MainSecurityInfo from '@/components/entity/MainSecurityInfo'

export default async function CurrentBond({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentStock(secID)

   if (!data || error)
      return <ErrorMessage errMessage={error || 'Облигация не найдена'} />

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
            <ControlPanel />
            <div className="mb-14 flex w-full flex-col items-center justify-center gap-4 768p:flex-row 768p:justify-center">
               <IMGshadowCard img={img} className="relative size-20">
                  <ImageServerErrorCheck
                     src={img}
                     alt={secID}
                     defaultSrc="/StockPlaceHolder.png"
                     className="rounded-2xl bg-gray-500"
                     onErrorClass={`dark:invert rounded bg-transparent dark:bg-transparent`}
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
            <MainSecurityInfo
               currencyList={StockInfoData}
               titleIndex={titleIndex}
               valueIndex={valueIndex}
               nameIndex={nameIndex}
            />
         </div>
      </Suspense>
   )
}
