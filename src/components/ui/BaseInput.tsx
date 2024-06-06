'use client'

import {
   FieldError,
   FieldValues,
   Path,
   RegisterOptions,
   UseFormRegister,
} from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/utils'
import { motion, MotionProps } from 'framer-motion'

export type BaseInput<T extends FieldValues> = {
   defaultValue?: string
   name: string
   register?: UseFormRegister<T>
   options?: RegisterOptions<T>
   error?: FieldError
   background?: string
} & InputHTMLAttributes<HTMLInputElement> &
   MotionProps

const BaseInput = <T extends FieldValues>({
   type,
   defaultValue,
   register,
   name,
   options,
   error,
   background,
   placeholder,
   ...props
}: BaseInput<T>) => {
   let additionalProps = props

   if (register)
      additionalProps = {
         ...props,
         ...register(name as Path<T>, {
            ...options,
         }),
      }

   return (
      <motion.input
         {...additionalProps}
         initial={{ x: -50, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         whileTap={{ scale: 0.95 }}
         transition={{ duration: 0.3 }}
         placeholder={placeholder}
         name={name}
         type={type}
         defaultValue={defaultValue}
         className={cn(
            `rounded-xl border-2 border-transparent bg-white px-4 py-2 text-black/90`,
            error && 'border-red-900'
         )}
      />
   )
}

export default BaseInput
