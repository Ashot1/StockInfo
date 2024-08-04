'use client'

import { ChangeEvent, FC, ReactNode, useRef } from 'react'
import { cn } from '@/utils/utils'

export type TCheckBox = {
   className?: string
   checked?: boolean
   click?: (e: ChangeEvent<HTMLInputElement>) => void
   children?: ReactNode
}

const CheckBox: FC<TCheckBox> = ({ className, checked, click, children }) => {
   const ref = useRef<HTMLInputElement | null>(null)
   return (
      <label
         className={cn(
            'relative block h-6 w-12 cursor-pointer rounded-2xl',
            className
         )}
         tabIndex={0}
         onKeyUp={(e) => {
            if (e.code === 'Enter' && ref.current) ref.current.click()
         }}
      >
         <input
            ref={ref}
            type="checkbox"
            className="peer hidden"
            checked={checked}
            onChange={click}
         />
         <div className="h-full w-full rounded-2xl bg-neutral-600 opacity-15 peer-checked:bg-green-600 dark:bg-[#aeaaae] dark:peer-checked:bg-[#84da89]" />
         <span
            className={`pointer-events-none absolute left-[10%] top-[10%] h-[80%] w-[40%] rounded-full bg-[var(--Main)] opacity-70 duration-300 peer-checked:left-[50%] peer-checked:bg-green-600`}
         />
         {children}
      </label>
   )
}

export default CheckBox
