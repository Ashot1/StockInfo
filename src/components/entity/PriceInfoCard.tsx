import { cn } from '@/utils/utils'
import { nunito, comfortaa } from '@/utils/fonts'
import { SecurityTemplateProps } from '@/components/module/SecurityTemplate'

export type PriceInfoCardProps = Partial<
   Pick<SecurityTemplateProps, 'MarketData'>
> & { className?: string }

export default function PriceInfoCard({
   MarketData,
   className,
}: PriceInfoCardProps) {
   const info = [
      { name: 'Мин', value: MarketData?.low },
      { name: 'Макс', value: MarketData?.high },
      { name: 'Откр', value: MarketData?.open },
      { name: 'Пред', value: MarketData?.prev },
   ]

   const current_price = Intl.NumberFormat('ru-RU', {
      currency: 'RUB',
      style: 'currency',
      maximumFractionDigits: 3,
   }).format(MarketData?.last || 0)

   return (
      <div
         className={cn(
            'min-w-[60%] rounded-2xl border-2 border-black/40 bg-black/10 p-3 dark:border-white/40 dark:bg-white/10 768p:min-w-[30%]',
            className
         )}
      >
         <p className="text-sm text-black/60 dark:text-white/40">Цена</p>
         <h2 className={cn('text-lg dark:text-white', nunito.className)}>
            {current_price}
         </h2>
         <span
            className={cn(
               'spacin mt-3 flex gap-2 text-sm tracking-wide opacity-70',
               comfortaa.className
            )}
         >
            {info.map((item) => {
               if (!item.value) return ''
               return (
                  <p key={item.name}>
                     {item.name}: {item.value}
                  </p>
               )
            })}
         </span>
      </div>
   )
}
