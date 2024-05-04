'use client'

import { FC, useContext } from 'react'
import PurchaseList from '@/components/ui/GridList/PurchaseList'
import { DataByType } from '@/utils/dataByType'
import PurchaseListItem, {
   PurchaseListItemLoading,
} from '@/components/ui/GridList/PurchaseListItem'
import { cn } from '@/utils/utils'
import { HomeContext } from '@/hoc/HomeProvider'
import { AuthContext } from '@/hoc/AuthProvider'
import { URLList } from '@/utils/const'
import { ConvertDate } from '@/utils/ConvertDate'

const Purchases: FC = () => {
   const { Purchases, error, loading } = useContext(HomeContext)
   const mainInfo = useContext(AuthContext).mainInfo

   if (loading)
      return (
         <PurchaseList className="w-[70%] 300p:w-[90%] 768p:w-[80%]">
            <PurchaseListItemLoading key={1} />
            <PurchaseListItemLoading key={2} />
            <PurchaseListItemLoading key={3} />
            <PurchaseListItemLoading key={4} />
         </PurchaseList>
      )

   return (
      <PurchaseList className={cn('w-[70%] 300p:w-[90%] 768p:w-[80%]')}>
         <PurchaseListItem
            type="Currency"
            SECID="RUB"
            url="#"
            current_price={mainInfo?.current_money || 0}
            quantity={1}
            image={`${URLList.logos_currency}/RUB.png`}
            shortname="Российский рубль"
            needCurrentPrice={false}
            className="min-h-full"
         />
         {Purchases?.map((item) => {
            const { img, url } = DataByType({
               imgSRC: item.image,
               SECID: item.SECID,
            })

            const price = item.price || 0

            return (
               <PurchaseListItem
                  key={item.SECID}
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
               />
            )
         })}
      </PurchaseList>
   )
}

export default Purchases
