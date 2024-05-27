'use client'

import { FC, useContext, useEffect, useState } from 'react'
import ColoredBlock, { ColoredBlockLoading } from '@/components/ui/ColoredBlock'
import { AuthContext } from '@/hoc/AuthProvider'
import { HomeContext } from '@/hoc/HomeProvider'
import {
   Drawer,
   DrawerContent,
   DrawerTrigger,
} from '@/components/ui/ShadCN/drawer'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { getDataByType } from '@/utils/utils'
import { ConvertDate } from '@/utils/Date'
import ScrollBlock from '@/components/ui/ScrollBlock'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'

const BalanceInfo: FC = () => {
   const [Balance, setBalance] = useState<{ summ: string; definition: number }>(
      { summ: '', definition: 0 }
   )
   const UserData = useContext(AuthContext).mainInfo
   const { Purchases, error, loading } = useContext(HomeContext)
   const [ModalState, setModalState] = useState(false)

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

   if (loading) return <BalanceInfoLoading />

   return (
      <Drawer open={ModalState} onOpenChange={(open) => setModalState(open)}>
         <DrawerTrigger className="grid w-full place-items-center" asChild>
            <ColoredBlock
               className="aspect-video w-[95%] animate-none 300p:aspect-[4/2] 300p:w-[85%] 768p:w-[50%]"
               title="Ваш счет"
               content={Balance.summ}
               variant={cardColor}
               actionText="Посмотреть транзакции ⥤"
               action={() => setModalState(true)}
            />
         </DrawerTrigger>
         <DrawerContent className="h-[85dvh] 1024p:m-auto 1024p:max-w-[60%]">
            {!UserData.transactions && (
               <EmptyListText text="Вы еще не совершали транзакций" />
            )}
            <ScrollBlock className="mt-3 px-4">
               {UserData.transactions?.map((item) => {
                  const { img, url } = getDataByType({
                     imgSRC: item.image,
                     SECID: item.secID,
                  })
                  const rubles = Intl.NumberFormat('ru-RU', {
                     currency: 'RUB',
                     style: 'currency',
                  })

                  const rightText = `${
                     item.transaction_type === 'buy' ? 'Покупка' : 'Продажа'
                  } ${item.quantity} шт. за ${rubles.format(item.price)}`

                  return (
                     <DefaultListItem
                        key={item.transaction_id}
                        img={img[item.security_type]}
                        text={`${item.Title} (${item.secID})`}
                        defaultIMG="/StockPlaceHolder.png"
                        subtext={ConvertDate(item.created_at)}
                        rightText={rightText}
                        className="mt-6 flex-col justify-center gap-3 border-b 500p:flex-row 500p:justify-between"
                     />
                  )
               })}
            </ScrollBlock>
         </DrawerContent>
      </Drawer>
   )
}

export default BalanceInfo

export const BalanceInfoLoading = () => {
   return (
      <ColoredBlockLoading className="aspect-video w-[95%] animate-none 300p:aspect-[4/2] 300p:w-[85%] 768p:w-[50%]" />
   )
}
