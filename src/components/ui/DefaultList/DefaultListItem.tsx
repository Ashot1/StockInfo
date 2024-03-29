import Link from 'next/link'
import { cn } from '@/utils/utils'
import ImageServerErrorCheck from '@/components/ui/ImageServerErrorCheck'

export type DefaultListItemProps = {
   img: string
   subtext?: string
   text: string
   rightText?: string | number
   rightSubtext?: number
   url: string
   className?: string
}

export default function DefaultListItem({
   img,
   subtext,
   text,
   rightText,
   url,
   rightSubtext,
   className,
}: DefaultListItemProps) {
   return (
      <Link
         href={url}
         className={cn(
            'flex cursor-pointer justify-between rounded-2xl px-4 py-3 duration-300 hover:bg-[var(--grayBG)]',
            className
         )}
      >
         <div className="flex items-center gap-3">
            <span className="relative size-11 768p:size-14">
               <ImageServerErrorCheck
                  defaultSrc="/StockPlaceHolder.png"
                  src={img}
                  className={`rounded-full bg-gray-200 text-center text-xs dark:bg-gray-500`}
                  onErrorClass={`dark:invert rounded bg-transparent dark:bg-transparent`}
                  alt={subtext || 'Logo'}
               />
            </span>
            <span>
               <p className="text-sm 768p:text-base">{text}</p>
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
      </Link>
   )
}
