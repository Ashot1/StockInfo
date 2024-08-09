import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/utils'
import { tektur } from '@/utils/fonts'
import BackButton from '@/components/entity/Buttons/BackButton'

export type ErrorMessageProps = {
   errMessage?: string
   className?: string
   children?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function ErrorMessage({
   errMessage,
   className,
   children,
   ...props
}: ErrorMessageProps) {
   return (
      <div
         className={cn('grid justify-items-center gap-4', className)}
         {...props}
      >
         <h2
            className={cn(
               'animate-fast-appearance text-lg text-red-400 768p:text-xl',
               tektur.className
            )}
         >
            Произошла ошибка
         </h2>
         <p className="text-center text-sm opacity-85 768p:text-base">
            {errMessage}
         </p>
         {children}
         <BackButton className="animate-appearance" />
      </div>
   )
}
