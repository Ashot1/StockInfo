'use client'

import { FC } from 'react'
import { DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { IModalContent, TModalSubContent } from '@/types/Modals.types'

const CustomModalContent: FC<IModalContent> = ({
   title,
   children,
   AnotherFooter,
   AnotherHeader,
   type,
}) => {
   const types = {
      Drawer: (
         <Main
            title={title}
            AnotherFooter={AnotherFooter}
            AnotherHeader={AnotherHeader}
            HeaderComponent={DrawerHeader}
            HeaderTitleComponent={DrawerTitle}
         >
            {children}
         </Main>
      ),
      Dialog: (
         <Main
            title={title}
            AnotherFooter={AnotherFooter}
            AnotherHeader={AnotherHeader}
            HeaderComponent={DialogHeader}
            HeaderTitleComponent={DialogTitle}
         >
            {children}
         </Main>
      ),
   }
   return types[type]
}

const Main: FC<TModalSubContent> = ({
   AnotherHeader,
   AnotherFooter,
   children,
   HeaderComponent,
   HeaderTitleComponent,
   title,
}) => {
   return (
      <>
         {AnotherHeader || (
            <HeaderComponent>
               <HeaderTitleComponent>{title}</HeaderTitleComponent>
            </HeaderComponent>
         )}
         {children}
         {AnotherFooter}
      </>
   )
}

export default CustomModalContent
