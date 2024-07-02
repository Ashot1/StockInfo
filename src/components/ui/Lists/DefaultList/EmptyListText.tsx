import { comfortaa } from '@/utils/fonts'
import { cn } from '@/utils/utils'

export default function EmptyListText({
   text,
   className,
}: {
   text: string
   className?: string
}) {
   return (
      <div
         className={cn(
            `grid w-full flex-1 place-items-center ${comfortaa.className}`,
            className
         )}
      >
         {text}
      </div>
   )
}
