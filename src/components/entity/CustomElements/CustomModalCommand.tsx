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

export type TCustomCommand = {
   placeholder: string
   triggerText: string | ReactNode
   classNameTrigger?: string
   hotKey?: { ctrl: boolean; shift: boolean; key: string }
   children?: ReactNode
   onSend: (value: string) => void
}

const CustomModalCommand: FC<TCustomCommand> = ({
   placeholder,
   triggerText,
   classNameTrigger,
   hotKey,
   children,
   onSend,
}) => {
   const [Open, setOpen] = useState(false)
   const [InputValue, setInputValue] = useState('')

   useEffect(() => {
      if (!hotKey) return

      const listener = (e: KeyboardEvent) => {
         const CTRL = hotKey.ctrl ? e.ctrlKey : !e.ctrlKey
         const shift = hotKey.shift ? e.shiftKey : !e.shiftKey

         if (e.key.toLowerCase() === hotKey.key.toLowerCase() && CTRL && shift)
            setOpen(true)
      }

      window.addEventListener('keyup', listener)

      return () => window.removeEventListener('keyup', listener)
   }, [hotKey])

   const keyUP = (e: KBevent<HTMLInputElement>) => {
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
               onKeyUp={keyUP}
               onValueChange={(val) => setInputValue(val)}
               value={InputValue}
            />
            <CommandList className="max-h-[60dvh]">
               <CommandEmpty>
                  <EmptyListText text="Для фильтрации найденного измените поле ввода, для поиска - отправте название из него с помощью Enter" />
               </CommandEmpty>
               {children}
            </CommandList>
         </CommandDialog>
      </>
   )
}

export default CustomModalCommand
