'use client'

import {
   ButtonHTMLAttributes,
   DetailedHTMLProps,
   forwardRef,
   ReactNode,
} from 'react'
import { cn } from '@/utils/utils'

export type LoginProviderButtonProps = {
   children: ReactNode
   color: string
   className?: string
} & DetailedHTMLProps<
   ButtonHTMLAttributes<HTMLButtonElement>,
   HTMLButtonElement
>

const LoginProviderButton = forwardRef<
   HTMLButtonElement,
   LoginProviderButtonProps
>(({ children, color, className, ...props }, ref) => {
   return (
      <button
         className={cn(
            'group relative flex aspect-square rounded-2xl',
            className
         )}
         ref={ref}
         {...props}
      >
         <span
            className={`z-10 h-full w-full rounded-2xl border-2 border-transparent p-4 duration-300 group-hover:border-black/50 group-hover:bg-black/10 group-hover:backdrop-blur-sm dark:group-hover:border-white/50 dark:group-hover:bg-white/10`}
         >
            {children}
         </span>
         <span
            className="absolute left-0 top-0 h-full w-full origin-bottom rounded-2xl duration-300 group-hover:rotate-45"
            style={{ background: color }}
         />
      </button>
   )
})

LoginProviderButton.displayName = 'LoginProviderButton'

export default LoginProviderButton
