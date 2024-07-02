'use client'

import { FC, useEffect, useState } from 'react'
import ColoredBlock, { ColoredBlockLoading } from '@/components/ui/ColoredBlock'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { useHomeContext } from '@/hoc/Providers/HomeProvider'
import { calculateDefinition, convertMoney } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { URLList } from '@/utils/config'
import ErrorMessage from '@/components/ui/ErrorMessage'

const BalanceInfo: FC = () => {
   const [Balance, setBalance] = useState<{ summ: string; definition: number }>(
      { summ: '', definition: 0 }
   )
   const UserData = useAuthContext().mainInfo
   const { Purchases, error, loading } = useHomeContext()

   const router = useRouter()

   useEffect(() => {
      let money = UserData?.current_money || 0

      if (!Purchases || !UserData?.transactions)
         return setBalance({ summ: convertMoney(money), definition: 0 })

      let purchase_summ = 0

      for (const item of Purchases) {
         purchase_summ += item.quantity * (item.price || 0)
      }

      money += purchase_summ
      const definition = UserData?.start_money
         ? calculateDefinition(UserData?.start_money, money)
         : 0

      setBalance({
         summ: convertMoney(money),
         definition,
      })
   }, [
      UserData?.current_money,
      UserData?.transactions,
      Purchases,
      UserData.start_money,
   ])

   const cardColor =
      Balance.definition === 0
         ? 'default'
         : Balance.definition > 0
           ? 'green'
           : 'red'

   if (loading) return <BalanceInfoLoading />
   if (error) return <ErrorMessage errMessage={error} />

   const additional =
      Balance.definition !== 0 &&
      `${Balance.definition >= 0 ? '+' : ''}${Balance.definition.toFixed(2)}%`

   return (
      <div className="grid w-full place-items-center">
         <ColoredBlock
            className="flex aspect-video w-[95%] animate-none items-center 300p:aspect-[4/2] 300p:w-[85%] 768p:w-[50%]"
            title="Ваш счет"
            content={Balance.summ}
            variant={cardColor}
            actionText="Подробнее 👉"
            action={() => router.push(URLList.transactions)}
         >
            <p className="ml-2 mt-3 text-xs opacity-45 500p:mt-5 500p:text-sm">
               {additional}
            </p>
         </ColoredBlock>
      </div>
   )
}

export default BalanceInfo

export const BalanceInfoLoading = () => {
   return (
      <ColoredBlockLoading
         className="aspect-video w-[95%] animate-none 300p:aspect-[4/2] 300p:w-[85%] 768p:w-[50%]"
         title="Ваш счет"
      />
   )
}
