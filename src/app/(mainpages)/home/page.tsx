import BalanceInfo from '@/components/module/BalanceInfo'
import Purchases from '@/components/module/Purchases'

export default async function Home() {
   return (
      <div className="mt-10 grid grid-cols-1 place-items-center gap-14 768p:mt-8">
         <BalanceInfo />
         <Purchases />
      </div>
   )
}
