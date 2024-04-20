// 'use client'

import { Button } from '@/components/ui/ShadCN/button'
import { cn } from '@/utils/utils'
import { nunito } from '@/utils/fonts'

export default function PriceInfoCard({
   price = 0,
}: {
   price?: string | number
}) {
   return (
      <div className="min-w-[60%] rounded-2xl border-2 border-black/40 bg-black/10 p-3 768p:min-w-[30%] dark:border-white/40 dark:bg-white/10">
         <p className="text-sm text-black/60 dark:text-white/40">Цена</p>
         <h2 className={cn('text-lg dark:text-white', nunito.className)}>
            {price} ₽
         </h2>
         {/*<Button variant="">Купить</Button>*/}
         {/*<Button>Продать</Button>*/}
      </div>
   )
}
