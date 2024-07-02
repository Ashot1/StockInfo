'use client'

import { FC, ReactNode, useRef } from 'react'
import type { TouchEvent } from 'react'
import { cn } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { SwipeLength } from '@/utils/config'

const SwipeNavigator: FC<{
   children: ReactNode
   next?: string | 'RouterForward'
   prev?: string | 'RouterBack'
   className?: string
}> = ({ next, prev, children, className }) => {
   const startPos = useRef(0)
   const { push, prefetch, back, forward } = useRouter()

   const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
      const currentPos = e.changedTouches[0].clientX
      const definition = startPos.current - currentPos

      if (definition >= SwipeLength && next) {
         next === 'RouterForward' ? forward() : push(next)
      }

      if (definition <= -SwipeLength && prev) {
         prev === 'RouterBack' ? back() : push(prev)
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
