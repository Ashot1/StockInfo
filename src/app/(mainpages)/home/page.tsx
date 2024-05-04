import BalanceInfo from '@/components/widgets/BalanceInfo'
import Purchases from '@/components/widgets/Purchases'
import HomeProvider from '@/hoc/HomeProvider'

export default async function Home() {
   return (
      <HomeProvider>
         <div className="mt-10 grid grid-cols-1 place-items-center gap-14 768p:mt-8">
            <BalanceInfo />
            <Purchases />
         </div>
      </HomeProvider>
   )
}
