'use client'

import { FC, ReactNode, useRef, type TouchEvent } from 'react'
import { SwipeLength } from '@/utils/config'

export type TSwipeAction = {
   children?: ReactNode
   className?: string
   next?: () => void
   prev?: () => void
}

const SwipeAction: FC<TSwipeAction> = ({ children, className, prev, next }) => {
   const startPos = useRef(0)

   const touchEnd = (e: TouchEvent) => {
      const currentPos = e.changedTouches[0].clientX
      const definition = startPos.current - currentPos

      if (definition >= SwipeLength && next) {
         next()
      }

      if (definition <= -SwipeLength && prev) {
         prev()
      }
   }

   return (
      <div
         className={className}
         onTouchStart={(e) => {
            startPos.current = e.touches[0].clientX
         }}
         onTouchEnd={touchEnd}
      >
         {children}
      </div>
   )
}

export default SwipeAction
