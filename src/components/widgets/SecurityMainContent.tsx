import { getCurrentStock } from '@/actions/Stocks'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import ImageServerErrorCheck from '@/components/ui/Img/ImageServerErrorCheck'
import IMGshadowCard from '@/components/ui/Img/IMGshadowCard'
import MainSecurityInfo from '@/components/entity/MainSecurityInfo'
import TransformSecurityData from '@/utils/TransformSecurityData'
import SwipeNavigator from '@/hoc/SwipeNavigator'

export default async function SecurityMainContent({
   secID,
   prevLink,
   img,
}: {
   secID: string
   prevLink?: string
   img?: string
}) {
   const { data, error } = await getCurrentStock(secID)

   if (!data || error)
      return <ErrorMessage errMessage={error || 'Акция не найдена'} />

   if (!data.description.data.length) {
      redirect(URLList.notFound)
      return
   }

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return

   return (
      <>
         <SwipeNavigator
            prev={prevLink}
            className="mb-14 flex w-full flex-col items-center justify-center gap-4 768p:flex-row 768p:justify-center"
         >
            <IMGshadowCard
               img={img || '/StockPlaceHolder'}
               className="relative size-20"
            >
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
         </SwipeNavigator>
         <MainSecurityInfo
            currencyList={StockInfoData}
            titleIndex={titleIndex}
            valueIndex={valueIndex}
            nameIndex={nameIndex}
         />
      </>
   )
}
