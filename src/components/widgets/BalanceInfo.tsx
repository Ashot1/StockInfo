'use client'

import { FC, useContext, useEffect, useState } from 'react'
import ColoredBlock from '@/components/ui/ColoredBlock'
import { AuthContext } from '@/hoc/AuthProvider'
import { HomeContext } from '@/hoc/HomeProvider'

const BalanceInfo: FC = () => {
   const [Balance, setBalance] = useState<{ summ: string; definition: number }>(
      { summ: '', definition: 0 }
   )
   const UserData = useContext(AuthContext).mainInfo
   const { Purchases, error, loading } = useContext(HomeContext)

   useEffect(() => {
      let money = UserData?.current_money || 0

      const ConvertMoney = Intl.NumberFormat('ru-RU', {
         currency: 'RUB',
         style: 'currency',
         notation: 'standard',
      })

      if (!Purchases || !UserData?.transactions)
         return setBalance({ summ: ConvertMoney.format(money), definition: 0 })

      let purchase_summ = 0

      for (const item of Purchases) {
         purchase_summ += item.quantity * (item.price || 0)
      }

      money += purchase_summ
      const definition = UserData?.start_money
         ? money - UserData.start_money
         : 0

      setBalance({
         summ: ConvertMoney.format(money),
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

   if (loading) return

   return (
      <div className="grid w-full place-items-center">
         <ColoredBlock
            className="aspect-video w-[95%] 300p:aspect-[4/2] 300p:w-[85%] 768p:w-[50%]"
            title="Ваш счет"
            content={Balance.summ}
            variant={cardColor}
         />
      </div>
   )
}

export default BalanceInfo
