'use client'

import { FC, ReactNode, useRef } from 'react'
import type { TouchEvent } from 'react'
import { cn } from '@/utils/utils'
import { useRouter } from 'next/navigation'

const SwipeNavigator: FC<{
   children: ReactNode
   next?: string
   prev?: string
   className?: string
}> = ({ next, prev, children, className }) => {
   const startPos = useRef(0)
   const { push, prefetch } = useRouter()

   const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
      const currentPos = e.changedTouches[0].clientX
      const definition = startPos.current - currentPos

      if (definition > 200 && next) {
         push(next)
      }

      if (definition < -200 && prev) {
         push(prev)
      }
   }

   return (
      <div
         onTouchStart={(e) => {
            next && prefetch(next)
            prev && prefetch(prev)
            startPos.current = e.touches[0].clientX
         }}
         onTouchEnd={touchEnd}
         className={cn('', className)}
      >
         {children}
      </div>
   )
}

export default SwipeNavigator
