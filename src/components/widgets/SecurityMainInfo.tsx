import ImageServerErrorCheck from '@/components/ui/ImageServerErrorCheck'
import IMGshadowCard from '@/hoc/IMGshadowCard'
import SwipeNavigator from '@/hoc/SwipeNavigator'

export default function SecurityMainInfo({
   secID,
   img,
   secCode,
   secTitle,
}: {
   secID: string
   img?: string
   secTitle: string
   secCode: string
}) {
   return (
      <>
         <SwipeNavigator
            prev="RouterBack"
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
               <p className="mb-1 text-sm 768p:text-base">{secTitle}</p>
               <p className="text-xs opacity-45 768p:text-sm">{secCode}</p>
            </span>
         </SwipeNavigator>
      </>
   )
}
