'use client'

import IMGcolorCard from '@/components/ui/Img/IMGcolorCard'
import ImageErrorCheck from '@/components/ui/Img/ImageErrorCheck'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { cn, convertMoney } from '@/utils/utils'
import { FC } from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/ShadCN/skeleton'
import { FavoritesListTypes } from '@/types/Auth.types'
import { motion } from 'framer-motion'
import { useMatchMedia } from '@/hooks/MatchMedia'

export type PurchaseListItemProps = {
   image: string
   type: FavoritesListTypes
   SECID: string
   shortname: string
   buy_price?: number
   date?: string
   current_price: number
   difference?: number
   url: string
   quantity?: number
   needCurrentPrice?: boolean
   className?: string
   isAnimated?: boolean
}

export default function PurchaseListItem({
   buy_price,
   current_price,
   date,
   shortname,
   type,
   SECID,
   image,
   url,
   difference,
   quantity,
   needCurrentPrice = true,
   className,
   isAnimated,
}: PurchaseListItemProps) {
   const MotionLink = motion(Link)
   const isTouchDevice = useMatchMedia('(pointer: coarse)')

   let animOptions = { initial: 'rest', animation: 'rest' }

   if (isAnimated)
      animOptions = isTouchDevice
         ? { initial: 'rest', animation: 'tap' }
         : { initial: 'tap', animation: 'rest' }

   return (
      <MotionLink
         href={url}
         className="cursor-pointer rounded-2xl border-2 border-transparent duration-300 hover:border-black dark:hover:border-white"
         prefetch={false}
         initial={animOptions.initial}
         whileHover={animOptions.animation}
         whileTap={animOptions.animation}
         variants={{ tap: { scale: 0.95 }, rest: { scale: 1 } }}
      >
         <IMGcolorCard img={image} key={SECID} className={className}>
            <div className="flex min-h-[200px] flex-col px-4 py-4">
               <motion.div
                  className="flex w-full items-center justify-center gap-3"
                  variants={{
                     tap: { height: 180, justifyContent: 'center' },
                     rest: { height: 'auto' },
                  }}
                  transition={{ duration: 0.2 }}
               >
                  <span className="relative aspect-square size-10 min-h-10 min-w-10 500p:size-12">
                     <ImageErrorCheck
                        alt={SECID}
                        defaultSrc={`/Menu/Shortcuts/${type}.png`}
                        src={image}
                        className="rounded-full"
                     />
                  </span>
                  <span className="text-center">
                     <p className="text-sm 500p:text-base 768p:text-base">
                        {shortname}
                     </p>
                     <p className="text-xs opacity-45 500p:text-sm 768p:text-sm">
                        {SECID}
                     </p>
                  </span>
               </motion.div>
               <motion.div
                  layout
                  className="infoAnimate block overflow-hidden"
                  variants={{ tap: { height: 0 }, rest: { height: 'auto' } }}
                  transition={{ duration: 0.2 }}
               >
                  <PriceInfo
                     buy_price={buy_price}
                     current_price={current_price}
                     difference={difference}
                     quantity={quantity}
                     needCurrentPrice={needCurrentPrice}
                  />
                  {date && (
                     <p className="mt-2 text-center text-xs opacity-80">
                        {date}
                     </p>
                  )}
               </motion.div>
            </div>
         </IMGcolorCard>
      </MotionLink>
   )
}

const PriceInfo: FC<
   Pick<
      PurchaseListItemProps,
      | 'buy_price'
      | 'current_price'
      | 'difference'
      | 'quantity'
      | 'needCurrentPrice'
   >
> = ({ current_price, buy_price, difference, quantity, needCurrentPrice }) => {
   const positiveCondition = difference && difference > 0

   return (
      <div className="mt-5 grid place-items-center">
         {buy_price && (
            <p className="text-xs opacity-50 500p:text-sm">
               {convertMoney(buy_price)}
            </p>
         )}
         {buy_price && <TriangleDownIcon className="size-5 opacity-50" />}
         {needCurrentPrice && (
            <p className="text-sm 500p:text-base">
               {convertMoney(current_price)} {quantity ? `x${quantity}` : null}
            </p>
         )}
         {quantity && (
            <p className="mt-4"> {convertMoney(current_price * quantity)}</p>
         )}
         {difference ? (
            <p
               className={cn(
                  'text-xs opacity-70 500p:text-sm',
                  positiveCondition
                     ? 'text-green-900 dark:text-green-200'
                     : 'text-red-600'
               )}
            >
               {positiveCondition && '+'}
               {convertMoney(difference)}
            </p>
         ) : null}
      </div>
   )
}

export function PurchaseListItemLoading() {
   return (
      <div className="rounded-2xl bg-[var(--grayBG)] p-4">
         <div className="relative flex flex-col py-4">
            <div className="flex w-full items-center justify-center gap-3">
               <Skeleton className="size-10 rounded-full 500p:size-12" />
               <span className="text-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="mt-2 h-4 w-12" />
               </span>
            </div>
            <div className="mt-5 grid place-items-center">
               <Skeleton className="h-4 w-10" />
               <TriangleDownIcon className="size-5 opacity-50" />
               <Skeleton className="h-4 w-16" />
               <Skeleton className="mt-4 h-4 w-10" />
               <Skeleton className="mt-2 h-4 w-24" />
            </div>
         </div>
      </div>
   )
}
