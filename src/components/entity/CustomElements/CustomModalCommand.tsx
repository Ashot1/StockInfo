'use client'

import { FC, KeyboardEvent as KBevent, ReactNode, useState } from 'react'
import {
   CommandDialog,
   CommandEmpty,
   CommandInput,
   CommandList,
} from '@/components/ui/ShadCN/command'
import EmptyListText from '@/components/ui/Lists/DefaultList/EmptyListText'
import FadedButton from '@/components/ui/Buttons/FadedButton'
import { cn } from '@/utils/utils'
import { THotKey, useHotKey } from '@/hooks/HotKeys'
import { DialogDescription, DialogTitle } from '@/components/ui/ShadCN/dialog'

export type TCustomCommand = {
   placeholder: string
   triggerText: string | ReactNode
   classNameTrigger?: string
   header: { title: string; description: string }
   hotKey?: THotKey
   children?: ReactNode
   onSend: (value: string) => void
   className?: string
}

const CustomModalCommand: FC<TCustomCommand> = ({
   placeholder,
   triggerText,
   classNameTrigger,
   hotKey,
   children,
   onSend,
   header,
   className,
}) => {
   const [Open, setOpen] = useHotKey(hotKey)
   const [InputValue, setInputValue] = useState('')

   const EnterSearch = (e: KBevent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         onSend(e.currentTarget.value)
         setInputValue('')
      }
   }

   return (
      <>
         <FadedButton
            className={classNameTrigger}
            onClick={() => setOpen(true)}
         >
            {triggerText}
         </FadedButton>
         <CommandDialog open={Open} onOpenChange={() => setOpen(false)}>
            <DialogTitle className="h-0 overflow-hidden">
               {header.title}
            </DialogTitle>
            <DialogDescription className="h-0 overflow-hidden">
               {header.description}
            </DialogDescription>
            <CommandInput
               placeholder={placeholder}
               onKeyUp={EnterSearch}
               onValueChange={(val) => setInputValue(val)}
               value={InputValue}
               className="pr-7"
            />
            <CommandList className={cn('max-h-[60dvh]', className)}>
               <CommandEmpty>
                  <EmptyListText
                     className="text-pretty px-2"
                     text="Для фильтрации найденного измените поле ввода, для поиска - отправте название из него с помощью Enter"
                  />
               </CommandEmpty>
               {children}
            </CommandList>
         </CommandDialog>
      </>
   )
}

export default CustomModalCommand
