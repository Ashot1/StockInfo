import Link from 'next/link'
import { cn } from '@/utils/utils'
import ImageServerErrorCheck, {
   ImageErrorProps,
} from '@/components/ui/Img/ImageServerErrorCheck'

export type DefaultListItemProps = {
   img: string
   subtext?: string
   text: string
   rightText?: string | number
   rightSubtext?: number
   url?: string
   className?: string
   defaultSRC: string
} & Pick<ImageErrorProps, 'onErrorClass'>

export default function DefaultListItem({
   img,
   subtext,
   text,
   rightText,
   url,
   rightSubtext,
   className,
   defaultSRC,
   onErrorClass,
}: DefaultListItemProps) {
   const content = (
      <>
         <div className="flex items-center gap-3">
            <span className="relative size-11 min-w-11 768p:size-14">
               <ImageServerErrorCheck
                  defaultSrc={defaultSRC}
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
      'flex cursor-pointer justify-between rounded-2xl px-4 py-3 duration-300'

   return url ? (
      <Link href={url} className={cn(defaultClass, className)}>
         {content}
      </Link>
   ) : (
      <div className={cn(defaultClass, className)}>{content}</div>
   )
}
