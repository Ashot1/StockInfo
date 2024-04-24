import ImageServerErrorCheck from '@/components/ui/Img/ImageServerErrorCheck'
import IMGshadowCard from '@/components/ui/Img/IMGshadowCard'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import AddToFavorite from '@/components/entity/AddToFavorite'
import { Enums } from '@/types/supabase.types'
import PriceInfoCard from '@/components/entity/PriceInfoCard'
import { SecurityTemplateProps } from '@/components/module/SecurityTemplate'

export type SecurityMainInfoProps = {
   secID: string
   img?: string
   secTitle: string
   secCode: string
   type: Enums<'favorite_types'>
} & Pick<SecurityTemplateProps, 'MarketData'>

export default function SecurityMainInfo({
   secID,
   img,
   secCode,
   secTitle,
   type,
   MarketData,
}: SecurityMainInfoProps) {
   return (
      <SwipeNavigator
         prev="RouterBack"
         className="flex w-full flex-col place-items-center gap-14"
      >
         <div className="flex flex-col items-center gap-4 768p:flex-row">
            <IMGshadowCard
               img={img || '/StockPlaceHolder.png'}
               className="relative size-20"
            >
               <ImageServerErrorCheck
                  src={img || '/StockPlaceHolder.png'}
                  alt={secID}
                  defaultSrc="/StockPlaceHolder.png"
                  className="rounded-2xl bg-gray-500/30"
                  onErrorClass={`dark:invert rounded bg-transparent dark:bg-transparent`}
               />
            </IMGshadowCard>
            <div className="flex flex-col gap-4 768p:flex-row">
               <span className="text-center">
                  <p className="mb-1 text-sm 768p:text-base">{secTitle}</p>
                  <p className="text-xs opacity-45 768p:text-sm">{secCode}</p>
               </span>
               <AddToFavorite
                  secID={secID}
                  type={type}
                  image={secID || img || '/StockPlaceHolder.png'}
               />
            </div>
         </div>
         <PriceInfoCard MarketData={MarketData} />
      </SwipeNavigator>
   )
}
