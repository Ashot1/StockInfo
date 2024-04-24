import BalanceInfo from '@/components/widgets/BalanceInfo'
import PurchasesList from '@/components/widgets/PurchasesList'

export default async function Home() {
   return (
      <>
         <BalanceInfo />
         <PurchasesList />
      </>
   )
}
