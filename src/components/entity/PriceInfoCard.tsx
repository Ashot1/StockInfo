import { calculateDefinition, cn, convertMoney } from '@/utils/utils'
import { nunito, comfortaa } from '@/utils/fonts'
import { SecurityTemplateProps } from '@/components/widgets/SecurityTemplate'

export type PriceInfoCardProps = Partial<
   Pick<SecurityTemplateProps, 'MarketData'>
> & { className?: string }

export default function PriceInfoCard({
   MarketData,
   className,
}: PriceInfoCardProps) {
   const info = [
      { name: 'Мин', value: MarketData?.low, label: 'Минимальная цена' },
      { name: 'Макс', value: MarketData?.high, label: 'Максимальная цена' },
      { name: 'Откр', value: MarketData?.open, label: 'Цена открытия' },
      { name: 'Пред', value: MarketData?.prev, label: 'Предыдущая цена' },
   ]

   const current_price = convertMoney(MarketData?.last || 0)

   let definition

   if (MarketData?.open && MarketData?.last)
      definition = calculateDefinition(MarketData?.open, MarketData?.last)
   else if (MarketData?.prev && MarketData?.last)
      definition = calculateDefinition(MarketData?.prev, MarketData?.last)

   return (
      <div
         className={cn(
            'min-w-[60%] rounded-2xl border-2 border-black/40 bg-black/10 p-3 dark:border-white/40 dark:bg-white/10 768p:min-w-[30%]',
            className
         )}
      >
         <p
            aria-label="Название блока"
            className="text-sm text-black/60 dark:text-white/40"
         >
            Цена
         </p>
         <span className="flex">
            <h2
               aria-label="Текущая цена"
               className={cn('text-lg dark:text-white', nunito.className)}
            >
               {current_price}
            </h2>
            {definition && (
               <p
                  aria-label="Разница цены открытия и последней цены"
                  className={cn(
                     'ml-2 flex items-center text-sm font-bold',
                     definition > 0 ? 'text-green-700' : 'text-red-800'
                  )}
               >
                  {definition > 0 ? '+' : ''}
                  {definition.toFixed(3)}%
               </p>
            )}
         </span>
         <span
            className={cn(
               'spacin mt-3 flex gap-2 text-sm tracking-wide opacity-70',
               comfortaa.className
            )}
         >
            {info.map((item) => {
               if (!item.value) return ''
               return (
                  <p key={item.name} aria-label={item.label}>
                     {item.name}: {item.value}
                  </p>
               )
            })}
         </span>
      </div>
   )
}
