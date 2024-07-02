'use client'

import { FC, ReactNode } from 'react'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import CalculatePagination from '@/utils/Pagination'
import { cn } from '@/utils/utils'
import { DefaultListItemLoader } from '@/components/ui/Lists/DefaultList/DefaultListItem'

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

export const DefaultListLoading: FC<{
   className?: string
   len?: number
}> = ({ className, len = 50 }) => {
   const items: ReactNode[] = []
   for (let index = 0; index < len; index++) {
      const animIndex = index <= 15 ? index : 15
      const className = `animate-appearance-moving opacity-0 fill-mode-forwards delay-${
         100 * animIndex
      }`
      items.push(<DefaultListItemLoader key={index} className={className} />)
   }

   return (
      <div
         className={cn(
            'my-8 flex flex-1 grid-cols-1 flex-col gap-6',
            className
         )}
      >
         {items}
      </div>
   )
}
