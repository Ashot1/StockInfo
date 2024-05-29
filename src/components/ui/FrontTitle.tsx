'use client'

import { FC, ReactNode } from 'react'
import { nunito } from '@/utils/fonts'
import { cn } from '@/utils/utils'
import { motion } from 'framer-motion'

const FrontTitle: FC<{ className?: string; children: ReactNode }> = ({
   className,
   children,
}) => {
   return (
      <motion.h1
         initial={{ backgroundSize: 0 }}
         whileInView={{ backgroundSize: '100%' }}
         transition={{ duration: 2 }}
         className={cn(
            `relative inline-block content-center text-pretty rounded-md bg-gradient-to-r from-indigo-300 to-purple-300 
            bg-no-repeat py-2 text-center text-lg brightness-90 dark:from-indigo-500 dark:to-purple-500 768p:py-0 1024p:text-xl`,
            nunito.className,
            className
         )}
      >
         {children}
      </motion.h1>
   )
}

export default FrontTitle
