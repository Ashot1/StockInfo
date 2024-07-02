'use client'

import { FC } from 'react'
import { cn } from '@/utils/utils'
import { lobster } from '@/utils/fonts'
import { motion } from 'framer-motion'

const RootLoader: FC<{ text: string; className?: string }> = ({
   className,
   text,
}) => {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.6 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.5 }}
         transition={{ duration: 600 }}
         className={cn(
            'fixed z-40 grid h-dvh w-dvw place-items-center bg-black',
            lobster.className,
            className
         )}
      >
         <span className="flex gap-1 text-6xl">
            {text.split('').map((letter, index) => {
               const delay = 100 * index

               return (
                  <p
                     key={`${letter}${index}`}
                     className={`delay-${delay} animate-fast-appearance-moving-top bg-gradient-to-b from-neutral-200 to-neutral-800 bg-clip-text text-transparent opacity-0 fill-mode-forwards`}
                  >
                     {letter}
                  </p>
               )
            })}
         </span>
      </motion.div>
   )
}

export default RootLoader
