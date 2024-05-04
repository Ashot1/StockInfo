import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
   FavoritesListTypes,
   TFavoritesList,
   TTransactionsList,
} from '@/types/Auth.types'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export async function TryCatch<T>(
   fn: () => Promise<{ data: T }>
): Promise<{ data?: T; error?: string }> {
   try {
      return await fn()
   } catch (error) {
      console.log(error)
      return { error: (error as Error).message }
   }
}

export function SortBySecurityType(list: TFavoritesList[]) {
   const SortedList: { [key in FavoritesListTypes]: string[] } = {
      Bond: [],
      Currency: [],
      News: [],
      Stock: [],
   }

   for (const i of list) {
      const type = i.type as FavoritesListTypes
      SortedList[type].push(i.secID)
   }
   return SortedList
}

export function getTransactionInfo(
   transactions: string[],
   Context_Transactions: TTransactionsList[]
) {
   const transactionsMAP = new Map(
      Context_Transactions.map((item) => [item.transaction_id, { ...item }])
   )

   let summ_price = 0,
      len = 0,
      last_date = new Date(''),
      quantity = 0

   for (const transaction of transactions) {
      const current_transaction = transactionsMAP.get(transaction)
      if (current_transaction) {
         summ_price += current_transaction.price
         len++
         last_date = current_transaction.created_at
         quantity += current_transaction.remainder
      }
   }

   const avg_price = summ_price / len

   return { avg_price, last_date, quantity, transactionsMAP }
}

export function CompleteDivision(num: number, divider: number) {
   return Math.floor(num / divider)
}
