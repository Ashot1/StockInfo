'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/ShadCN/button'
import { cn } from '@/utils/utils'
import { ClassValue } from 'clsx'

export interface PrettyButtonProps {
   href?: string
   children: string
   className?: ClassValue
}

export default function PrettyButton({
   href,
   children,
   className: classNameProp,
}: PrettyButtonProps) {
   const className: ClassValue = `px-4 py-2 text-sm rounded-full text-white prettyButtonEffect relative overflow-hidden block`
   const WrapperClasName: ClassValue = 'prettyButtonEffectWrapper relative'

   if (href) {
      return (
         <Link href={href} className={cn(WrapperClasName, classNameProp)}>
            <span className={className}>{children}</span>
         </Link>
      )
   }
   return (
      <Button className={cn(WrapperClasName, classNameProp)}>
         <span className={className}>{children}</span>
      </Button>
   )
}
