'use client'

import { CopyIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'
import { cn } from '@/utils/utils'

export type TInfoPlaceHolder = {
   title: string
   text: string
   titleClassName?: string
   textClassName?: string
   className?: string
}

export default function InfoPlaceHolder({
   text,
   title,
   className,
   titleClassName,
   textClassName,
}: TInfoPlaceHolder) {
   return (
      <div
         tabIndex={0}
         className={cn(
            `flex cursor-pointer justify-between overflow-hidden rounded-xl bg-[var(--grayBG)] px-4 py-3 text-sm transition hover:bg-[rgb(0,0,0,0.15)] dark:hover:bg-[rgb(255,255,255,0.15)]`,
            className
         )}
         onClick={() =>
            toast.promise(navigator.clipboard.writeText(text), {
               loading: 'Копирование...',
               success: 'Текст скопирован',
               error: (e) => e.message,
            })
         }
         aria-label={`${title} - ${text}. Копировать при нажатии`}
      >
         <div className="max-w-[80%]" aria-hidden>
            <span className={cn('opacity-70', titleClassName)}>{title}</span>
            <p className={cn('truncate', textClassName)}>{text}</p>
         </div>
         <CopyIcon className="size-4 opacity-40" aria-hidden />
      </div>
   )
}
