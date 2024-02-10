import { ReactNode } from 'react'
import { nunito, raleway, tektur } from '@/utils/fonts'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { cn } from '@/utils/utils'

export default function PageTitle({
   children,
   animated = true,
}: {
   children: ReactNode
   animated?: boolean
}) {
   return (
      <div
         className={cn(
            'mb-6 flex items-center justify-between',
            animated && 'animate-appearance'
         )}
      >
         <p className={`mb-6 text-lg 300p:text-xl ${raleway.className}`}>
            {children}
         </p>
         <span className="768p:hidden">
            <MainMenuDropDown />
         </span>
      </div>
   )
}
