'use client'

import { useColor } from 'color-thief-react'
import { FC, ReactNode } from 'react'
import { cn } from '@/utils/utils'

const IMGcolorCard: FC<{
   img: string
   children?: ReactNode
   className?: string
}> = ({ img, children, className }) => {
   const { data, error } = useColor(img, 'hex')

   return (
      <div className="relative h-full">
         <div
            className={cn(
               'z-10 min-h-full rounded-2xl bg-black/10 backdrop-blur-3xl dark:bg-white/15',
               className
            )}
         >
            {children}
         </div>
         <span
            style={{ background: error ? 'var(--Main)' : data }}
            className="absolute left-[50%] top-[50%] -z-10 size-[80%] translate-x-[-50%] translate-y-[-50%] rounded-2xl opacity-50 dark:opacity-60"
         ></span>
      </div>
   )
}

export default IMGcolorCard
