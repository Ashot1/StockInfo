'use client'

import { FC } from 'react'
import CheckBox, { TCheckBox } from '@/components/ui/CheckBox/CheckBox'
import { comfortaa } from '@/utils/fonts'
import { cn } from '@/utils/utils'

export type CheckBoxRowProps = {
   text: string
   checked?: boolean
   additional?: string
} & Pick<TCheckBox, 'click'>

const CheckBoxRow: FC<CheckBoxRowProps> = ({
   click,
   text,
   checked,
   additional,
}) => {
   return (
      <label
         className={cn(
            'flex cursor-pointer items-center gap-6',
            comfortaa.className
         )}
      >
         <CheckBox click={click} checked={checked} className="min-w-[48px]" />
         <span className="grid grid-cols-1">
            <p className="opacity-90">{text}</p>
            {additional && <p className="text-xs opacity-50">{additional}</p>}
         </span>
      </label>
   )
}

export default CheckBoxRow
