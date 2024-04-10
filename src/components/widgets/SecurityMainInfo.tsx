import ImageServerErrorCheck from '@/components/ui/Img/ImageServerErrorCheck'
import IMGshadowCard from '@/components/ui/Img/IMGshadowCard'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import AddToFavorite from '@/components/entity/AddToFavorite'
import { Enums } from '@/types/supabase.types'

export default function SecurityMainInfo({
   secID,
   img,
   secCode,
   secTitle,
   type,
}: {
   secID: string
   img?: string
   secTitle: string
   secCode: string
   type: Enums<'favorite_types'>
}) {
   return (
      <>
         <SwipeNavigator
            prev="RouterBack"
            className="mb-14 flex w-full flex-col items-center justify-center gap-4 768p:flex-row 768p:justify-center"
         >
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
         </SwipeNavigator>
      </>
   )
}
