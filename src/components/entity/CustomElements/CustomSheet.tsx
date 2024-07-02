'use client'

import { FC, ReactNode } from 'react'
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/ShadCN/sheet'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils/utils'
import { THotKey, useHotKey } from '@/hooks/HotKeys'

export type TCustomSheet = {
   TriggerText: string | ReactNode
   Title: string | ReactNode
   Description?: string | ReactNode
   classNameTrigger?: string
   className?: string
   children?: ReactNode
   hotKey?: THotKey
}

const CustomSheet: FC<TCustomSheet> = ({
   TriggerText,
   Title,
   classNameTrigger,
   className,
   children,
   hotKey,
   Description,
}) => {
   const [Open, setOpen] = useHotKey(hotKey)

   return (
      <Sheet open={Open} onOpenChange={() => setOpen((prev) => !prev)}>
         <SheetTrigger className={cn('', classNameTrigger)}>
            {TriggerText}
         </SheetTrigger>
         <SheetContent className={cn('', className)}>
            <SheetHeader>
               <SheetTitle>{Title}</SheetTitle>
               <SheetDescription>{Description}</SheetDescription>
            </SheetHeader>
            {children}
         </SheetContent>
      </Sheet>
   )
}

export default CustomSheet
