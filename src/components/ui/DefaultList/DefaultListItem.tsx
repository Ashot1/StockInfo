import Link from 'next/link'
import { cn } from '@/utils/utils'
import ImageServerErrorCheck, {
   ImageErrorProps,
} from '@/components/ui/Img/ImageServerErrorCheck'
import { FC } from 'react'
import { Skeleton } from '@/components/ui/ShadCN/skeleton'

export type DefaultListItemProps = {
   img: string
   subtext?: string
   text: string
   rightText?: string | number
   rightSubtext?: number
   url?: string
   className?: string
   defaultIMG: string
} & Pick<ImageErrorProps, 'onErrorClass'>

export default function DefaultListItem({
   img,
   subtext,
   text,
   rightText,
   url,
   rightSubtext,
   className,
   defaultIMG,
   onErrorClass,
}: DefaultListItemProps) {
   const content = (
      <>
         <div className="flex items-center gap-3">
            <span className="relative size-11 min-w-11 768p:size-14">
               <ImageServerErrorCheck
                  defaultSrc={defaultIMG}
                  src={img}
                  className={`rounded-full bg-gray-600/15 text-center text-xs drop-shadow-xl dark:bg-gray-600/15`}
                  onErrorClass={cn(
                     `rounded bg-transparent dark:bg-transparent`,
                     onErrorClass
                  )}
                  alt={subtext || 'Logo'}
               />
            </span>
            <span>
               <p className="clipText text-sm 768p:text-base">{text}</p>
               {subtext && (
                  <p className="76p:text-sm text-xs opacity-50">{subtext}</p>
               )}
            </span>
         </div>
         <div>
            {rightText && (
               <p className="768p:texst-base text-end text-sm">{rightText}</p>
            )}
            {rightSubtext ? (
               <p
                  className={`${
                     rightSubtext > 0 ? 'text-green-700' : 'text-red-700'
                  } text-end text-sm`}
               >
                  {rightSubtext > 0 ? '+' : ''}
                  {rightSubtext}%
               </p>
            ) : (
               ''
            )}
         </div>
      </>
   )

   const defaultClass =
      'flex cursor-pointer justify-between rounded-2xl px-4 py-3 duration-300 hover:bg-[var(--grayBG)] hover:shadow hover:shadow-black/30 dark:hover:shadow-white/30'

   return url ? (
      <Link href={url} className={cn(defaultClass, className)}>
         {content}
      </Link>
   ) : (
      <div className={cn(defaultClass, className)}>{content}</div>
   )
}

export const DefaultListItemLoader: FC<{ className?: string }> = ({
   className,
}) => {
   return (
      <div
         className={cn(
            'flex justify-between rounded-2xl px-4 py-3 duration-300',
            className
         )}
      >
         <div className="flex items-center gap-3">
            <span className="relative size-11 min-w-11 768p:size-14">
               <Skeleton className="h-full w-full rounded-full" />
            </span>
            <span className="flex flex-col gap-2">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-4 w-16" />
            </span>
         </div>
         <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-14" />
         </div>
      </div>
   )
}
