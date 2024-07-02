'use client'

import { FC, useContext } from 'react'
import PurchaseList from '@/components/ui/Lists/PurchaseList/PurchaseList'
import PurchaseListItem, {
   PurchaseListItemLoading,
} from '@/components/ui/Lists/PurchaseList/PurchaseListItem'
import { cn, getDataByType } from '@/utils/utils'
import { useHomeContext } from '@/hoc/Providers/HomeProvider'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { LocalStorageParameters, URLList } from '@/utils/config'
import { ConvertDate } from '@/utils/Date'
import { LocalStorageCheckerContext } from '@/hoc/LocalSettingsChecker'
import ErrorMessage from '@/components/ui/ErrorMessage'

const Purchases: FC = () => {
   const { Purchases, loading, error } = useHomeContext()
   const mainInfo = useAuthContext().mainInfo
   const isAnimated =
      useContext(LocalStorageCheckerContext) ===
      LocalStorageParameters.purchaseAnimation.positive

   if (loading) return <PurchasesLoading />
   if (error) return <ErrorMessage errMessage={error} />

   return (
      <PurchaseList className={cn('w-[70%] 300p:w-[80%] 768p:w-[80%]')}>
         <PurchaseListItem
            key="RUB-Purchases"
            type="Currency"
            SECID="RUB"
            url="#"
            current_price={mainInfo?.current_money || 0}
            quantity={1}
            image={`${URLList.logos_currency}/RUB.png`}
            shortname="Российский рубль"
            needCurrentPrice={false}
            className="min-h-full"
            isAnimated={isAnimated}
         />
         {Purchases?.map((item) => {
            const { img, url } = getDataByType({
               imgSRC: item.image,
               SECID: item.SECID,
            })

            const price = item.price || 0

            return (
               <PurchaseListItem
                  key={`${item.SECID}-Purchases`}
                  type={item.type}
                  image={img[item.type]}
                  SECID={item.SECID}
                  buy_price={item.average_buy_price}
                  shortname={item.SHORTNAME}
                  date={ConvertDate(item.last_buy_date, false)}
                  current_price={price}
                  difference={(price - item.average_buy_price) * item.quantity}
                  url={url[item.type]}
                  quantity={item.quantity}
                  isAnimated={isAnimated}
               />
            )
         })}
      </PurchaseList>
   )
}

export default Purchases

export const PurchasesLoading = () => {
   return (
      <PurchaseList className="w-[70%] 300p:w-[90%] 768p:w-[80%]">
         <PurchaseListItemLoading key={1} />
         <PurchaseListItemLoading key={2} />
         <PurchaseListItemLoading key={3} />
         <PurchaseListItemLoading key={4} />
      </PurchaseList>
   )
}
