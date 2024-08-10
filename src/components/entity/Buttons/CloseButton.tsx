'use client'

import { FC } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { cn } from '@/utils/utils'
import { Button } from '@/components/ui/ShadCN/button'
import { motion } from 'framer-motion'

export type CloseButtonProps = {
   href?: string
   className?: string
   onClick?: () => void
}

const MotionLink = motion(Link)

const CloseButton: FC<CloseButtonProps> = ({ href, className, onClick }) => {
   if (href)
      return (
         <MotionLink
            href={href}
            className={cn(
               'absolute right-4 top-4 rounded-full p-2 text-foreground duration-200 hover:bg-secondary',
               className
            )}
            aria-label="Закрыть окно"
         >
            <Cross1Icon className="size-4" aria-hidden />
         </MotionLink>
      )

   return (
      <Button
         variant="ghost"
         onClick={onClick}
         className={cn('absolute right-4 top-4 rounded-full', className)}
         aria-label="Закрыть окно"
      >
         <Cross1Icon className="size-4" aria-hidden />
      </Button>
   )
}

export default CloseButton
