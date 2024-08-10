'use client'

import { forwardRef, Ref, MouseEvent } from 'react'
import { cn } from '@/utils/utils'
import { Button } from '@/components/ui/ShadCN/button'
import { cva } from 'class-variance-authority'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

export type NavButtonProps = {
   direction: 'left' | 'right'
   href?: string
} & typeof Button.defaultProps

const variants = cva('hover:bg-primary/10 flex gap-4 group', {
   variants: {
      variant: {
         left: 'rounded-l-full',
         right: 'rounded-r-full',
      },
   },
   defaultVariants: {
      variant: 'left',
   },
})

const NavButton = forwardRef<
   HTMLAnchorElement | HTMLButtonElement,
   NavButtonProps
>(({ href, children, className, onClick, direction, ...props }, ref) => {
   const router = useRouter()
   let clickFN = onClick

   if (href)
      clickFN = (e: MouseEvent<HTMLInputElement>) => {
         onClick?.(e)
         router.push(href)
      }

   return (
      <Button
         variant="ghost"
         ref={ref as Ref<HTMLButtonElement>}
         className={cn(variants({ className, variant: direction }), '')}
         onClick={clickFN}
         {...props}
      >
         {direction === 'left' && (
            <ChevronLeftIcon className="size-6 duration-200 group-hover:translate-x-2" />
         )}
         {children}
         {direction === 'right' && (
            <ChevronRightIcon className="size-6 duration-200 group-hover:-translate-x-2" />
         )}
      </Button>
   )
})

NavButton.displayName = 'NavButton'
export default NavButton
