'use client'

import { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { cn } from '@/utils/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { motion, MotionProps } from 'framer-motion'

type TSpan = { anotherElement: never } & HTMLAttributes<HTMLSpanElement>

type TButton = {
   anotherElement?: true
} & ButtonHTMLAttributes<HTMLButtonElement>

type FadedButton = (TSpan | TButton) &
   VariantProps<typeof variants> &
   MotionProps

const variants = cva(
   'flex items-center justify-center gap-3 rounded-full px-3 py-1.5 duration-300 cursor-pointer text-sm',
   {
      variants: {
         variant: {
            default: 'bg-[var(--grayBG)] hover:scale-110',
            outlined: 'border-2 border-[var(--grayBG)]',
            secondary:
               'bg-[var(--grayBG)] border-2 border-transparent hover:border-[var(--grayBG)]',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   }
)

const FadedButton: FC<FadedButton> = ({
   anotherElement,
   className,
   children,
   variant,
   ...props
}) => {
   if (anotherElement)
      return (
         <motion.span
            className={cn(variants({ variant, className }))}
            {...props}
         >
            {children}
         </motion.span>
      )

   return (
      <motion.button
         className={cn(variants({ variant, className }))}
         {...props}
      >
         {children}
      </motion.button>
   )
}

export default FadedButton
