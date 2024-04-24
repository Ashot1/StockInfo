'use client'

import { FC } from 'react'
import { cn } from '@/utils/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { raleway } from '@/utils/fonts'

type withAction = {
   actionText: string
   action: () => void
}

type withoutAction = {
   actionText?: never
   action?: never
}

export type BalanceBlockProps = {
   className?: string
   title?: string
   content?: string
} & VariantProps<typeof variants> &
   (withAction | withoutAction)

const variants = cva('rounded-3xl shadow-2xl animate-scaling', {
   variants: {
      variant: {
         default:
            'shadow-[rgba(89,89,90,.60)] dark:shadow-[rgba(246,244,244,.20)] bg-[linear-gradient(225deg,rgba(47,47,58,.50),rgba(89,89,90,.50))] dark:bg-[linear-gradient(225deg,rgba(246,244,244,.75),rgba(89,89,90,.75))]',
         green: 'shadow-[rgba(86,166,49,.60)] dark:shadow-[rgba(88,164,117,.40)] bg-[linear-gradient(90deg,rgba(154,202,34,.55),rgba(86,166,49,.55),rgba(9,128,54,.55))] dark:bg-[linear-gradient(90deg,rgba(130,186,114,.8),rgba(88,164,117,.8),rgba(52,141,103,.8),rgba(42,121,91,.8),rgba(41,112,85,.8))]',
         red: 'shadow-[rgba(225,65,65,.4)] bg-[linear-gradient(90deg,rgba(225,65,65,.6),rgba(223,98,98,.5),rgba(238,145,145,.5))]',
      },
   },
   defaultVariants: {
      variant: 'default',
   },
})

const ColoredBlock: FC<BalanceBlockProps> = ({
   className,
   variant,
   actionText,
   action,
   title,
   content,
}) => {
   return (
      <button
         onClick={action}
         // whileTap={{ scale: 0.9 }}
         className={cn(variants({ variant, className }), 'relative flex')}
      >
         <span className="flex h-[75%] flex-col justify-center pl-4 500p:pl-8">
            <p
               className={cn(
                  'text-start text-xs 500p:text-sm 768p:text-base',
                  raleway.className
               )}
            >
               {title}
            </p>
            <h1 className={cn('text-base font-bold 500p:text-lg 768p:text-xl')}>
               {content}
            </h1>
         </span>
         {actionText && (
            <span className="absolute bottom-4 right-6 text-sm opacity-40">
               {actionText}
            </span>
         )}
      </button>
   )
}

export default ColoredBlock
