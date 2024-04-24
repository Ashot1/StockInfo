import { DefaultListBase } from '@/components/ui/DefaultList/DefaultList'
import { DefaultListItemLoader } from '@/components/ui/DefaultList/DefaultListItem'
import { ReactNode } from 'react'

export default function StocksListLoading() {
   const items: ReactNode[] = []
   for (let index = 0; index < 50; index++) {
      const animIndex = index <= 15 ? index : 15
      const className = `animate-appearance-moving opacity-0 fill-mode-forwards delay-${
         100 * animIndex
      }`
      items.push(<DefaultListItemLoader className={className} />)
   }
   return <DefaultListBase>{...items}</DefaultListBase>
}
