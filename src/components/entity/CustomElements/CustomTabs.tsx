'use client'

import { FC, ReactNode, useState } from 'react'
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/components/ui/ShadCN/tabs'
import { AnimatePresence, motion } from 'framer-motion'

const MotionTabsContent = motion(TabsContent)

export type TabsContentType = {
   name: string
   value: string
   component: ReactNode
}

const CustomTabs: FC<{
   content: TabsContentType[]
}> = ({ content }) => {
   const [Value, setValue] = useState(content[0].value)

   return (
      <Tabs
         defaultValue={content[0].value}
         onValueChange={(value) => setValue(value)}
      >
         <TabsList className="mb-12 flex w-full flex-wrap gap-2 bg-transparent 300p:mb-9">
            {content.map((info) => (
               <TabsTrigger
                  key={info.value}
                  value={info.value}
                  className="data-[state=active]:bg-[var(--grayBG)] data-[state=active]:shadow-2xl"
               >
                  {info.name}
               </TabsTrigger>
            ))}
         </TabsList>
         <AnimatePresence initial={false} mode="wait">
            {content.map(
               (item) =>
                  Value == item.value && (
                     <MotionTabsContent
                        initial={{ y: 20, opacity: 0.4 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0.4 }}
                        key={item.value}
                        value={item.value}
                     >
                        {item.component}
                     </MotionTabsContent>
                  )
            )}
         </AnimatePresence>
      </Tabs>
   )
}

export default CustomTabs
