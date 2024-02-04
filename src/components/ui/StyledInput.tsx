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
import {
   bellota,
   comfortaa,
   poiretone,
   raleway,
   russoOne,
   tektur,
} from '@/utils/fonts'

export type StyledInputProps<T extends FieldValues> = {
   defaultValue?: string
   title: string
   name: string
   register?: UseFormRegister<T>
   options?: RegisterOptions<T>
   error?: FieldError
   background?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>

const StyledInput = <T extends FieldValues>({
   type,
   defaultValue,
   title,
   register,
   name,
   options,
   error,
   background,
}: StyledInputProps<T>) => {
   let additionalProps = {}

   if (register)
      additionalProps = {
         ...register(name as Path<T>, {
            ...options,
         }),
      }

   return (
      <label className="relative flex flex-col cursor-text">
         <input
            {...additionalProps}
            name={name}
            type={type}
            defaultValue={defaultValue}
            className={cn(
               `py-1.5 px-2 rounded-lg text-transparent duration-300
               bg-[var(--grayBG)] focus:bg-transparent
               border-2 border-transparent
               focus:border-black dark:focus:border-white focus:text-black dark:focus:text-white peer`,
               comfortaa.className,
               error && 'border-red-900'
            )}
         />
         <span
            className={cn(
               `absolute top-2 left-3 peer-focus:-top-3.5 duration-200 flex gap-3 items-center max-w-[80%] px-3 peer-focus:text-sm rounded`,
               background
            )}
         >
            <p className="">{title}</p>
            {defaultValue && '/'}
            {defaultValue && (
               <p className="opacity-25 text-sm truncate">{defaultValue}</p>
            )}
         </span>

         <span className="min-h-6 flex gap-2 items-center ml-2 text-red-900 text-sm">
            {error && <ExclamationTriangleIcon className="size-4 mt-0.5" />}
            {error ? error?.message || <>Ошибка</> : ''}
         </span>
      </label>
   )
}

export default StyledInput
