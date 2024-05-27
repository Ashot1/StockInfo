import { BalanceInfoLoading } from '@/components/widgets/BalanceInfo'
import { PurchasesLoading } from '@/components/widgets/Purchases'

export default function Loading() {
   return (
      <div className="mt-10 grid grid-cols-1 place-items-center gap-14 768p:mt-8">
         <BalanceInfoLoading />
         <PurchasesLoading />
      </div>
   )
}
