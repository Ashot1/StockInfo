'use client'

import { FC, ReactNode, useState } from 'react'
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/components/ui/ShadCN/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import SwipeAction from '@/hoc/SwipeAction'

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

   const NextSwipe = () => {
      setValue((previous) => {
         const idx = content.findIndex((item) => item.value === previous)
         if (idx < 0 || idx >= content.length - 1) return previous

         return content[idx + 1].value
      })
   }

   const PrevSwipe = () => {
      setValue((previous) => {
         const idx = content.findIndex((item) => item.value === previous)
         if (!idx || idx <= 0) return previous

         return content[idx - 1].value
      })
   }

   return (
      <Tabs
         defaultValue={content[0].value}
         value={Value}
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
         <SwipeAction next={NextSwipe} prev={PrevSwipe}>
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
                           className="min-h-[40dvh]"
                        >
                           {item.component}
                        </MotionTabsContent>
                     )
               )}
            </AnimatePresence>
         </SwipeAction>
      </Tabs>
   )
}

export default CustomTabs
