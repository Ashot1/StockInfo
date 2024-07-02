import { BalanceInfoLoading } from '@/components/module/BalanceInfo'
import { PurchasesLoading } from '@/components/module/Purchases'

export default function Loading() {
   return (
      <div className="mt-10 grid grid-cols-1 place-items-center gap-14 768p:mt-8">
         <BalanceInfoLoading />
         <PurchasesLoading />
      </div>
   )
}
