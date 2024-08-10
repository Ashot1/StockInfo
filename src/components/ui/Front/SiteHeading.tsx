'use client'

import { forwardRef, ReactNode } from 'react'
import Logo from '@/components/ui/Text/Logo'
import { URLList } from '@/utils/config'
import Image from 'next/image'
import Icon from '@/app/favicon.ico'
import CloseButton from '@/components/entity/Buttons/CloseButton'
import { cn } from '@/utils/utils'

const SiteHeading = forwardRef<
   HTMLDivElement,
   { children?: ReactNode; closeButton?: boolean; className?: string }
>(({ children, className, closeButton = true }, ref) => {
   return (
      <div
         className={cn(
            'relative z-10 flex w-full animate-appearance flex-col items-center justify-center px-5 py-6 500p:px-10',
            className
         )}
         ref={ref}
      >
         <Image
            src={Icon}
            alt="logo"
            width={60}
            height={60}
            className="drop-shadow-xl"
         />
         <Logo
            variant="filled"
            scale={0.65}
            className="mt-4 h-5 w-[8.8rem] dark:invert"
         />
         {children}
         <div className="radial-top-mask background-grid absolute -z-[1] h-full w-full overflow-hidden bg-sky-700 opacity-35" />
         {closeButton && <CloseButton href={URLList.front} />}
      </div>
   )
})

SiteHeading.displayName = 'SiteHeading'
export default SiteHeading
