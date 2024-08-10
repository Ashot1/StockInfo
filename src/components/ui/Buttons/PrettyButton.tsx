'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/ShadCN/button'
import { cn } from '@/utils/utils'
import { ClassValue } from 'clsx'
import { HTMLMotionProps, motion, MotionProps } from 'framer-motion'

export type PrettyButtonProps = {
   href?: string
   children: string
   className?: ClassValue
   onClick?: () => void
} & typeof Button.defaultProps

const MotionLink = motion(Link)

export default function PrettyButton({
   href,
   children,
   className: classNameProp,
   onClick,
   ...MotionProps
}: PrettyButtonProps) {
   const className: ClassValue = `px-4 py-2 text-sm rounded-full text-white prettyButtonEffect relative overflow-hidden block`
   const WrapperClasName: ClassValue =
      'prettyButtonEffectWrapper relative rounded-full p-0'

   if (href) {
      return (
         <MotionLink
            whileTap={{ scale: 0.9 }}
            href={href}
            className={cn(WrapperClasName, classNameProp)}
            {...MotionProps}
         >
            <span className={className}>{children}</span>
         </MotionLink>
      )
   }
   return (
      <Button
         className={cn(WrapperClasName, classNameProp)}
         onClick={onClick}
         {...MotionProps}
      >
         <span className={className}>{children}</span>
      </Button>
   )
}
