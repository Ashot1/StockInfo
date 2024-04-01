'use client'

import {
   FC,
   KeyboardEvent as KBevent,
   ReactNode,
   useEffect,
   useRef,
   useState,
} from 'react'
import {
   CommandDialog,
   CommandEmpty,
   CommandInput,
   CommandList,
} from '@/components/ui/ShadCN/command'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import FadedButton from '@/components/ui/FadedButton'
import { cn } from '@/utils/utils'
import { THotKey, useHotKey } from '@/hooks/HotKeys'

export type TCustomCommand = {
   placeholder: string
   triggerText: string | ReactNode
   classNameTrigger?: string
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
