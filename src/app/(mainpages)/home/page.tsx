import BalanceInfo from '@/components/module/BalanceInfo'
import Purchases from '@/components/module/Purchases'
import LocalSettingsChecker from '@/hoc/LocalSettingsChecker'
import { LocalStorageParameters } from '@/utils/config'

export default async function Home() {
   return (
      <div className="mt-10 grid grid-cols-1 place-items-center gap-14 768p:mt-8">
         <BalanceInfo />
         <LocalSettingsChecker
            Params={LocalStorageParameters.purchaseAnimation}
         >
            <Purchases />
         </LocalSettingsChecker>
      </div>
   )
}
