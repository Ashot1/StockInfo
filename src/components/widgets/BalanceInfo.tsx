'use client'

import { FC, useContext } from 'react'
import ColoredBlock from '@/components/ui/ColoredBlock'
import { AuthContext } from '@/hoc/AuthProvider'

const BalanceInfo: FC = () => {
   const UserData = useContext(AuthContext).mainInfo

   const money = UserData?.start_money || 0

   const ConvertMoney = Intl.NumberFormat('ru-RU', {
      currency: 'RUB',
      style: 'currency',
      notation: 'standard',
   }).format(money)

   return (
      <div className="mt-10 grid w-full place-items-center 768p:mt-16">
         <ColoredBlock
            className="aspect-video w-[95%] 300p:aspect-[4/2] 300p:w-[80%] 768p:w-[50%]"
            title="Ваш счет"
            content={ConvertMoney}
         />
      </div>
   )
}

export default BalanceInfo
