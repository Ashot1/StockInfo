'use client'

import { FC, useEffect, useState } from 'react'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { ConvertDate } from '@/utils/Date'
import { TTransactionsList } from '@/types/Auth.types'
import TransactionListItem from '@/components/entity/TransactionListItem'
import { MobileScreen } from '@/utils/config'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { cn } from '@/utils/utils'
import { nunito } from '@/utils/fonts'

export type FormatedTransactionsListType = {
   time: string
} & Omit<TTransactionsList, 'user_id'>

type newData = { [key: string]: FormatedTransactionsListType[] }

const Transactions: FC = () => {
   const { transactions } = useAuthContext().mainInfo
   const isMobile = useMatchMedia(MobileScreen)

   const [FormatedTransactions, setFormatedTransactions] = useState<
      newData | undefined
   >(undefined)

   useEffect(() => {
      if (!transactions) return
      let newArr: newData = {}

      transactions.forEach(({ user_id, ...item }) => {
         const initialDate = ConvertDate(item.created_at).split(', ')
         const onlyDate = initialDate.at(0)
         const onlyTime = initialDate.at(1)
         if (!onlyDate || !onlyTime) return
         const element = { ...item, time: onlyTime }
         newArr[onlyDate] = newArr[onlyDate]
            ? [...newArr[onlyDate], element]
            : [element]
      })
      setFormatedTransactions(newArr)
   }, [transactions])

   if (!FormatedTransactions) return

   const modalType = isMobile ? 'Drawer' : 'Dialog'

   return (
      <div>
         {Object.entries(FormatedTransactions).map(
            ([date, transactionList]) => {
               return (
                  <div className="mt-10" key={`${date}`}>
                     <h3 className={cn('text-lg opacity-30', nunito.className)}>
                        {date}
                     </h3>
                     <List
                        transactionList={transactionList}
                        date={date}
                        modalType={modalType}
                     />
                  </div>
               )
            }
         )}
      </div>
   )
}

export default Transactions

const List: FC<{
   transactionList: FormatedTransactionsListType[]
   date: string
   modalType: 'Drawer' | 'Dialog'
}> = ({ transactionList, date, modalType }) => {
   return (
      <ul className="mt-2 flex w-full flex-col gap-4">
         {transactionList.map(
            ({
               transaction_type,
               time,
               security_type,
               image,
               quantity,
               price,
               Title,
               remainder,
               secID,
               created_at,
               transaction_id,
            }) => {
               return (
                  <TransactionListItem
                     key={`${date} - ${time} - ${secID}`}
                     type={modalType}
                     transaction_id={transaction_id}
                     Title={Title}
                     price={price}
                     quantity={quantity}
                     remainder={remainder}
                     image={image}
                     transaction_type={transaction_type}
                     security_type={security_type}
                     secID={secID}
                     time={time}
                     date={created_at}
                     CustomComponent="li"
                  />
               )
            }
         )}
      </ul>
   )
}
