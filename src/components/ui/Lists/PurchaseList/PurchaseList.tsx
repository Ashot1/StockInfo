import { cn } from '@/utils/utils'
import { ReactNode } from 'react'

export default function PurchaseList({
   className,
   children,
}: {
   className?: string
   children: ReactNode
}) {
   return (
      <div
         className={cn('grid gap-3 500p:grid-cols-2', className)}
         aria-label="Список имеющихся активов"
      >
         {children}
      </div>
   )
}
