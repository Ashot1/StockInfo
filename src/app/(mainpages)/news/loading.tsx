import { ReactNode } from 'react'
import { NewsListItemLoader } from '@/components/ui/NewsListItem'

export default function NewsListLoading() {
   const items: ReactNode[] = []
   for (let index = 0; index < 50; index++) {
      const className = `animate-appearance-moving opacity-0 fill-mode-forwards delay-${
         100 * (index <= 15 ? index : 15)
      }`
      items.push(<NewsListItemLoader className={className} />)
   }

   return (
      <div
         className="my-5 flex flex-1 flex-col
                rounded-2xl border-2 bg-neutral-300/40 p-2 opacity-85 500p:ml-0 500p:w-full 768p:p-4 dark:bg-neutral-900/50"
      >
         {...items}
      </div>
   )
}
