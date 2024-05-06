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
               'z-10 min-h-full rounded-2xl bg-black/10 dark:bg-white/10',
               className
            )}
         >
            {children}
         </div>
         <span
            style={{
               background: error
                  ? 'var(--Main)'
                  : `radial-gradient(${data} 5%, transparent)`,
            }}
            className="absolute left-0 top-0 -z-10 size-full rounded-2xl opacity-40 dark:opacity-30"
         ></span>
      </div>
   )
}

export default IMGcolorCard
