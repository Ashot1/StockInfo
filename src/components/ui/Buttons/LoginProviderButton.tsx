'use client'

import {
   ButtonHTMLAttributes,
   DetailedHTMLProps,
   FC,
   HTMLAttributes,
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

const LoginProviderButton: FC<LoginProviderButtonProps> = ({
   children,
   color,
   className,
   ...props
}) => {
   return (
      <button
         className={cn('group relative flex aspect-square', className)}
         {...props}
      >
         <span
            className={`z-10 h-full w-full rounded-2xl border-2 border-transparent p-4
               duration-300 group-hover:border-black/50 group-hover:bg-black/10 group-hover:backdrop-blur-sm`}
         >
            {children}
         </span>
         <span
            className="absolute left-0 top-0 h-full w-full origin-bottom rounded-2xl duration-300 group-hover:rotate-45"
            style={{ background: color }}
         />
      </button>
   )
}

export default LoginProviderButton
