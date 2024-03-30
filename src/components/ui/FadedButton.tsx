'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, HTMLProps } from 'react'
import { cn } from '@/utils/utils'

const FadedButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
   className,
   children,
   ...props
}) => {
   return (
      <button
         className={cn(
            'flex items-center justify-center gap-3 rounded-full bg-[var(--grayBG)] px-3 py-1.5 duration-300 hover:scale-110',
            className
         )}
         {...props}
      >
         {children}
      </button>
   )
}

export default FadedButton
