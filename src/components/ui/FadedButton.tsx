'use client'

import { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { cn } from '@/utils/utils'

type TSpan = { anotherElement: never } & HTMLAttributes<HTMLSpanElement>

type TButton = {
   anotherElement?: true
} & ButtonHTMLAttributes<HTMLButtonElement>

type FadedButton = TSpan | TButton

const FadedButton: FC<FadedButton> = ({
   anotherElement,
   className,
   children,
   ...props
}) => {
   const FadedClass =
      'flex items-center justify-center gap-3 rounded-full bg-[var(--grayBG)] px-3 py-1.5 duration-300 hover:scale-110 cursor-pointer text-sm'

   if (anotherElement)
      return (
         <span className={cn(FadedClass, className)} {...props}>
            {children}
         </span>
      )

   return (
      <button className={cn(FadedClass, className)} {...props}>
         {children}
      </button>
   )
}

export default FadedButton
