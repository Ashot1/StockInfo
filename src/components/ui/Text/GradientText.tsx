import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/utils'

export type GradientTextProps = {
   text?: ReactNode
} & HTMLAttributes<HTMLSpanElement>

export default function GradientText({
   className,
   children,
   ...props
}: GradientTextProps) {
   return (
      <span
         className={cn(
            'bg-gradient-to-r from-[#4c6ca8] to-[#b94e76] bg-clip-text text-transparent',
            className
         )}
         {...props}
      >
         {children}
      </span>
   )
}
