'use client'

import { FC, ReactNode } from 'react'
import { useColor } from '@/hooks/Colors'

const IMGshadowCard: FC<{
   img: string
   children: ReactNode | string
   className?: string
}> = ({ children, img, className }) => {
   const { data, error } = useColor({ image: img, mode: 'hex' })

   return (
      <div
         className={className}
         style={{
            filter: `drop-shadow(0 0 50px ${error ? 'var(--Main)' : data})`,
         }}
      >
         {children}
      </div>
   )
}

export default IMGshadowCard
