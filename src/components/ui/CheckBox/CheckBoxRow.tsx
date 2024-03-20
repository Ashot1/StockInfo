'use client'

import { FC } from 'react'
import CheckBox, { TCheckBox } from '@/components/ui/CheckBox/CheckBox'
import { comfortaa } from '@/utils/fonts'

const CheckBoxRow: FC<
   { text: string; checked?: boolean } & Pick<TCheckBox, 'click'>
> = ({ click, text, checked }) => {
   return (
      <label className="flex cursor-pointer items-center gap-6">
         <CheckBox click={click} checked={checked} />
         <p className={`opacity-90 ${comfortaa.className}`}>{text}</p>
      </label>
   )
}

export default CheckBoxRow
