'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/hoc/AuthProvider'
import GridList from '@/components/ui/GridList/GridList'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { TTransactionsList } from '@/types/Auth.types'
import { FetchFavorites } from '@/actions/Account/client'
import toast from 'react-hot-toast'
import { TFormatedFavoriteList } from '@/components/widgets/FavoriteList'

type StateType =
   | (TFormatedFavoriteList & Pick<TTransactionsList, 'transaction_id'>)[]
   | undefined

const PurchasesList: FC = () => {
   const [Purchases, setPurchases] = useState<StateType>(undefined)
   const Context_Purchases = useContext(AuthContext).mainInfo?.purchases

   useEffect(() => {
      if (!Context_Purchases) return

      FetchFavorites(Context_Purchases).then(({ data, error }) => {
         if (error || !data)
            return toast.error(error || 'Ошибка получения избранного')
         if (data.length <= 0) return setPurchases(undefined)

         const newData: StateType = []

         for (const pur of Context_Purchases) {
            const info = data.find((item) => item.SECID === pur.secID)
            if (info)
               newData.push({ transaction_id: pur.transaction_id, ...info })
         }
         setPurchases(newData)
      })
   }, [Context_Purchases])

   if (!Purchases) return <EmptyListText text="Вы еще ничего не купили" />

   return (
      <GridList>
         {Purchases.map((item) => {
            return <p key={item.SECID}>{item.SECID}</p>
         })}
      </GridList>
   )
}

export default PurchasesList
