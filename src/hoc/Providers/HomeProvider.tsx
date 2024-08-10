'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { TFormatedFavoriteList } from '@/components/module/Favorite'
import { TPurchasesList } from '@/types/Auth.types'
import { FetchInfo } from '@/actions/Security/CommonSecurity'
import { getTransactionInfo } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/utils/config'

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

const HomeContext = createContext<homeContextType>(initialState)

export default function HomeProvider({ children }: { children: ReactNode }) {
   const Context = useAuthContext().mainInfo
   const Context_Purchases = Context?.purchases
   const Context_Transactions = Context?.transactions

   const { error, data, isLoading } = useQuery({
      queryKey: [queryKeys.Purchase],
      queryFn: () => FetchInfo(Context_Purchases),
      select: ({ data: fetchData }) => {
         const newData: StateType = []

         if (!fetchData || !Context_Purchases || !Context_Transactions)
            return newData

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
      retry: 2,
      staleTime: Infinity,
   })

   return (
      <HomeContext.Provider
         value={{ loading: isLoading, error: error?.message, Purchases: data }}
      >
         {children}
      </HomeContext.Provider>
   )
}

export const useHomeContext = () => useContext(HomeContext)
