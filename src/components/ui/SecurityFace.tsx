import IMGshadowCard from '@/components/ui/Img/IMGshadowCard'
import ImageErrorCheck from '@/components/ui/Img/ImageErrorCheck'
import AddToFavorite from '@/components/entity/AddToFavorite'
import { FavoritesListTypes } from '@/types/Auth.types'
import { cn } from '@/utils/utils'

export type SecurityFaceProps = {
   image?: string
   secID: string
   secTitle: string
   secCode: string
   type?: FavoritesListTypes
   variant?: 'vertical' | 'horizontal'
   className?: string
}

export default function SecurityFace({
   image,
   secID,
   secCode,
   secTitle,
   type,
   variant = 'horizontal',
   className,
}: SecurityFaceProps) {
   return (
      <div
         className={cn(
            'flex items-center gap-6',
            variant === 'horizontal' ? 'flex-col 768p:flex-row' : 'flex-col',
            className
         )}
      >
         <IMGshadowCard
            img={image || '/StockPlaceHolder.png'}
            className="relative size-20"
         >
            <ImageErrorCheck
               src={image || '/StockPlaceHolder.png'}
               alt={secID}
               defaultSrc="/StockPlaceHolder.png"
               className="rounded-2xl bg-gray-500/30"
               onErrorClass={`dark:invert rounded bg-transparent dark:bg-transparent`}
            />
         </IMGshadowCard>
         <div
            className={cn(
               'flex gap-4',
               variant === 'horizontal' ? 'flex-col 768p:flex-row' : 'flex-col'
            )}
         >
            <span
               className={cn(
                  variant === 'horizontal'
                     ? 'text-center 768p:text-start'
                     : 'text-center'
               )}
            >
               <p
                  aria-label="Название бумаги"
                  className="mb-1 text-sm 768p:text-base"
               >
                  {secTitle}
               </p>
               <p
                  aria-label="Код бумаги"
                  className="text-xs opacity-45 768p:text-sm"
               >
                  {secCode}
               </p>
            </span>
            {type && (
               <AddToFavorite
                  secID={secID}
                  type={type}
                  image={secID || image || '/StockPlaceHolder.png'}
               />
            )}
         </div>
      </div>
   )
}
