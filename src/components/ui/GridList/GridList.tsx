import { cn } from '@/utils/utils'
import { ReactNode } from 'react'

export default function GridList({
   className,
   children,
}: {
   className?: string
   children: ReactNode
}) {
   return <div className={cn('grid grid-cols-2', className)}>{children}</div>
}
