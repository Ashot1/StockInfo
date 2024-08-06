import {
   FieldError,
   FieldValues,
   Path,
   RegisterOptions,
   UseFormRegister,
} from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils/utils'
import { comfortaa } from '@/utils/fonts'

export type StyledInputProps<T extends FieldValues> = {
   defaultValue?: string
   title: string
   name: string
   register?: UseFormRegister<T>
   options?: RegisterOptions<T>
   error?: FieldError
   background?: string
} & InputHTMLAttributes<HTMLInputElement>

const StyledInput = <T extends FieldValues>({
   type,
   defaultValue,
   title,
   register,
   name,
   options,
   error,
   background,
   ...props
}: StyledInputProps<T>) => {
   let additionalProps = props

   if (register)
      additionalProps = {
         ...props,
         ...register(name as Path<T>, {
            ...options,
         }),
      }

   return (
      <label className="relative flex cursor-text flex-col">
         <div className="relative">
            <input
               {...additionalProps}
               name={name}
               type={type}
               defaultValue={defaultValue}
               className={cn(
                  `peer w-full rounded-lg border-2 border-transparent bg-[var(--grayBG)] px-2 py-2 text-transparent duration-300 focus:border-black focus:bg-transparent focus:text-black dark:focus:border-white dark:focus:text-white`,
                  comfortaa.className,
                  error && 'border-red-900'
               )}
            />
            <span
               className={cn(
                  `absolute left-3 top-[50%] flex max-w-[80%] translate-y-[-50%] items-center gap-3 rounded px-2 duration-200 peer-autofill:-top-3.5 peer-autofill:translate-y-0 peer-autofill:text-sm peer-focus:-top-3.5 peer-focus:translate-y-0 peer-focus:text-sm`,
                  background
               )}
            >
               <p className="">{title}</p>
               {defaultValue && '/'}
               {defaultValue && (
                  <p className="truncate text-sm opacity-25">{defaultValue}</p>
               )}
            </span>
         </div>

         <span className="ml-2 flex min-h-6 items-center gap-2 text-sm text-red-900">
            {error && <ExclamationTriangleIcon className="mt-0.5 size-4" />}
            {error ? error?.message : ''}
         </span>
      </label>
   )
}

export default StyledInput
