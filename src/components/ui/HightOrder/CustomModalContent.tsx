'use client'

import { FC } from 'react'
import {
   DrawerHeader,
   DrawerTitle,
   DrawerDescription,
} from '@/components/ui/ShadCN/drawer'
import {
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from '@/components/ui/ShadCN/dialog'
import { IModalContent, TModalSubContent } from '@/types/Modals.types'

const CustomModalContent: FC<IModalContent> = ({
   title,
   children,
   AnotherFooter,
   AnotherHeader,
   type,
   description,
}) => {
   const types = {
      Drawer: (
         <Main
            title={title}
            description={description}
            AnotherFooter={AnotherFooter}
            AnotherHeader={AnotherHeader}
            HeaderComponent={DrawerHeader}
            HeaderTitleComponent={DrawerTitle}
            DescriptionComponent={DrawerDescription}
         >
            {children}
         </Main>
      ),
      Dialog: (
         <Main
            title={title}
            description={description}
            AnotherFooter={AnotherFooter}
            AnotherHeader={AnotherHeader}
            HeaderComponent={DialogHeader}
            HeaderTitleComponent={DialogTitle}
            DescriptionComponent={DialogDescription}
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
   DescriptionComponent,
   title,
   description,
}) => {
   return (
      <>
         {AnotherHeader || (
            <HeaderComponent>
               <HeaderTitleComponent>{title}</HeaderTitleComponent>
               {description && (
                  <DescriptionComponent>{description}</DescriptionComponent>
               )}
            </HeaderComponent>
         )}
         {children}
         {AnotherFooter}
      </>
   )
}

export default CustomModalContent
