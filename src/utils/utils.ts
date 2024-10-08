import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
   FavoritesListTypes,
   TFavoritesList,
   TTransactionsList,
} from '@/types/Auth.types'
import { URLList } from '@/utils/config'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export async function TryCatch<T>(
   fn: () => Promise<{ data: T; error: null }>
): Promise<{ data: T | null; error: string | null }> {
   try {
      return await fn()
   } catch (error) {
      console.error(error)
      return { error: (error as Error).message, data: null }
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

export function getDataByType({
   imgSRC,
   SECID,
}: {
   imgSRC: string
   SECID: string
}) {
   const img: { [key in FavoritesListTypes]: string } = {
      Stock: `${URLList.logos_stock}/${imgSRC}.svg`,
      Bond: `${URLList.logos_bonds}/${imgSRC}.png`,
      News: imgSRC as string,
      Currency: `${URLList.logos_currency}/${imgSRC}.png`,
   }
   const url: { [key in FavoritesListTypes]: string } = {
      Bond: `${URLList.current_bond}/${SECID}`,
      Stock: `${URLList.current_stock}/${SECID}`,
      News: `${URLList.current_news}/${SECID}`,
      Currency: `${URLList.current_currency}/${SECID}`,
   }

   return { img: img, url: url }
}

export function calculateDefinition(open: number, last: number) {
   return ((last - open) / ((open + last) / 2)) * 100
}

export function debounce(func: Function, wait: number) {
   let timeout: NodeJS.Timeout

   return function (this: any, ...args: any[]) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
   }
}

export const convertMoney = (value: number, len = 3) => {
   return Intl.NumberFormat('ru-RU', {
      currency: 'RUB',
      style: 'currency',
      notation: 'standard',
      currencyDisplay: 'symbol',
      maximumFractionDigits: len,
   }).format(value)
}

export const changeThemeMetaTag = (theme: 'dark' | 'light') => {
   const tag = document.querySelector('meta[name="theme-color"]')
   if (tag)
      tag.setAttribute('content', theme === 'dark' ? '#121212' : '#fafafa')
}
