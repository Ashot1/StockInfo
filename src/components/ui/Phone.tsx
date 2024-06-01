import { HTMLAttributes } from 'react'
import { cn } from '@/utils/utils'

export interface PhoneProps extends HTMLAttributes<HTMLDivElement> {}

export default function Phone({ className, children, ...props }: PhoneProps) {
   return (
      <div
         className={cn(
            `relative aspect-[3/6] w-40 rounded-2xl bg-neutral-900 shadow-inner shadow-gray-50
            before:absolute before:right-0 before:top-[35%] before:h-16 before:w-0.5 before:rounded-full before:bg-black
            after:absolute after:right-0 after:top-[20%] after:h-8 after:w-0.5 after:rounded-full after:bg-black`,
            className
         )}
         {...props}
      >
         {children}
      </div>
   )
}
