'use client'

import { FC, HTMLAttributes } from 'react'
import { cn } from '@/utils/utils'
import { comfortaa } from '@/utils/fonts'
import { motion, MotionProps } from 'framer-motion'

export type FrontText = HTMLAttributes<HTMLParagraphElement> & MotionProps

const FrontText: FC<FrontText> = ({ className, children, ...props }) => {
   return (
      <motion.p
         className={cn(
            'z-20 self-start overflow-hidden text-pretty rounded-2xl p-4 text-center text-sm backdrop-blur 768p:self-center 768p:text-end 1024p:text-base',
            comfortaa.className,
            className
         )}
         initial={{ height: 0 }}
         whileInView={{
            height: 'auto',
            scrollSnapAlign: 'center',
            scrollBehavior: 'smooth',
         }}
         transition={{ duration: 1 }}
         {...props}
      >
         {children}
      </motion.p>
   )
}

export default FrontText
