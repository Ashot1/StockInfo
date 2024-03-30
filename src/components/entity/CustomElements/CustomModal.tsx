'use client'

import { FC, ReactNode } from 'react'
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from '@/components/ui/ShadCN/dialog'
import { cn } from '@/utils/utils'

export type TCustomModal = {
   text: string | ReactNode
   classNameTrigger?: string
   className?: string
   children?: ReactNode
}

const CustomModal: FC<TCustomModal> = ({
   text,
   className,
   classNameTrigger,
   children,
}) => {
   return (
      <Dialog>
         <DialogTrigger
            className={cn(
               'flex items-center justify-center gap-3 rounded-full bg-[var(--grayBG)] px-3 py-1.5 duration-300 hover:scale-110',
               classNameTrigger
            )}
         >
            {text}
         </DialogTrigger>
         <DialogContent className={className}>{children}</DialogContent>
      </Dialog>
   )
}

export default CustomModal
