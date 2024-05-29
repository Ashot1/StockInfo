import { HTMLAttributes } from 'react'
import { cn } from '@/utils/utils'
import Link from 'next/link'

export type ScrollDotMenuDirections = 'left' | 'top' | 'right' | 'bottom'

export interface ScrollDotMenuProps extends HTMLAttributes<HTMLDivElement> {
   className?: string
   links: string[]
   direction?: ScrollDotMenuDirections
   activeItemLink?: string
}

export default function ScrollDotMenu({
   links,
   className,
   direction = 'right',
   activeItemLink,
   ...props
}: ScrollDotMenuProps) {
   const stylesDirection: Record<ScrollDotMenuDirections, string> = {
      left: 'left-6 top-1/2',
      top: 'top-10 left-1/2',
      bottom: 'bottom-10 left-1/2',
      right: 'right-6 top-1/2',
   }

   return (
      <div
         className={cn(
            `translateCenter absolute z-30 flex animate-scaling gap-4 rounded-full
            border border-primary/10 bg-primary/5 duration-300 hover:border-primary/15 hover:bg-primary/10
            500p:gap-2`,
            direction === 'top' || direction === 'bottom'
               ? 'px-4 py-2'
               : 'flex-col px-2 py-4',
            stylesDirection[direction],
            className
         )}
         {...props}
      >
         {links.map((link) => (
            <Link
               key={link}
               href={link}
               className={cn(
                  'size-3 rounded-full bg-primary/30 duration-500 500p:size-2.5 768p:hover:bg-primary/80',
                  link === activeItemLink && 'bg-primary/85'
               )}
            />
         ))}
      </div>
   )
}
