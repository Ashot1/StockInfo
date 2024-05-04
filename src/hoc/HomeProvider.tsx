'use client'

import { createContext, ReactNode, useCallback, useContext } from 'react'
import { AuthContext } from '@/hoc/AuthProvider'
import { useQuery } from '@/hooks/Query'
import { TFormatedFavoriteList } from '@/components/widgets/Favorite'
import { TPurchasesList } from '@/types/Auth.types'
import { FetchFavorites } from '@/actions/Account/Client'
import { getTransactionInfo } from '@/utils/utils'

type StateType =
   | (TFormatedFavoriteList & {
        average_buy_price: number
        last_buy_date: Date
        quantity: number
     } & Pick<TPurchasesList, 'transaction_id'>)[]
   | undefined

type homeContextType = {
   Purchases: StateType
   loading: boolean
   error: string | undefined
}

const initialState: homeContextType = {
   Purchases: [],
   error: undefined,
   loading: true,
}

export const HomeContext = createContext<homeContextType>(initialState)

export default function HomeProvider({ children }: { children: ReactNode }) {
   const Context = useContext(AuthContext).mainInfo
   const Context_Purchases = Context?.purchases
   const Context_Transactions = Context?.transactions

   const {
      data: Purchases,
      error,
      loading,
   } = useQuery<TFormatedFavoriteList[], StateType>({
      queryFn: useCallback(() => {
         if (Context_Purchases && Context_Purchases.length > 0)
            return FetchFavorites(Context_Purchases)
         else return new Promise((resolve, reject) => resolve({}))
      }, [Context_Purchases]),

      select: (fetchData) => {
         if (!fetchData || !Context_Purchases || !Context_Transactions)
            return undefined
         const newData: StateType = []

         const dataMAP = new Map(
            fetchData.map((item) => [item.SECID, { ...item }])
         )

         for (const pur of Context_Purchases) {
            const info = dataMAP.get(pur.secID)

            const { avg_price, quantity, last_date } = getTransactionInfo(
               pur.transaction_id,
               Context_Transactions
            )

            if (info)
               newData.push({
                  transaction_id: pur.transaction_id,
                  average_buy_price: avg_price,
                  last_buy_date: last_date,
                  quantity: quantity,
                  ...info,
               })
         }
         return newData
      },
   })

   return (
      <HomeContext.Provider value={{ loading, error, Purchases }}>
         {children}
      </HomeContext.Provider>
   )
}
