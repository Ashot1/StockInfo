'use client'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/ShadCN/dropdown-menu'
import TripleMenu from '@/components/ui/TripleMenu'
import { FC, ReactNode, useState } from 'react'

const TripleDropDown: FC<{ children: ReactNode }> = ({ children }) => {
   const [Active, setActive] = useState(false)

   return (
      <DropdownMenu open={Active} onOpenChange={setActive}>
         <DropdownMenuTrigger>
            <TripleMenu
               dopClassRows={`bg-main transition-all group-hover:shadow-[0_0_15px_var(--Main)] duration-200`}
               Active={Active}
            />
         </DropdownMenuTrigger>
         <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
   )
}

export default TripleDropDown
