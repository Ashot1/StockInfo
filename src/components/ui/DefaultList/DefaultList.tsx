'use client'

import { FC, ReactNode } from 'react'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import CalculatePagination from '@/utils/CalculatePagination'
import { cn } from '@/utils/utils'

type WithSwipe = {
   CurrentStartIndex: number
   Step: number
   url: string
   maxLength: number
}

export type DefaultListProps = {
   children?: ReactNode
} & WithSwipe

export default function DefaultList({
   children,
   CurrentStartIndex,
   Step,
   url,
   maxLength,
}: DefaultListProps) {
   const { prevLink, nextLink } = CalculatePagination({
      start: CurrentStartIndex,
      Step,
      pathname: url,
      maxLength,
   })

   return (
      <SwipeNavigator
         next={nextLink}
         prev={prevLink}
         className={'my-8 flex flex-1 grid-cols-1 flex-col gap-6 opacity-85'}
      >
         {children}
      </SwipeNavigator>
   )
}

export const DefaultListBase: FC<{
   children: ReactNode
   className?: string
}> = ({ children, className }) => {
   return (
      <div
         className={cn(
            'my-8 flex flex-1 grid-cols-1 flex-col gap-6',
            className
         )}
      >
         {children}
      </div>
   )
}
