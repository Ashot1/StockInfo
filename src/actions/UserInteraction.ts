'use server'

import { getTransactionInfo, TryCatch } from '@/utils/utils'
import {
   getSupabaseUser,
   GetUserMainData,
   UpdateUserMainData,
} from '@/actions/Account/Account'
import { TPurchasesList, TTransactionsList } from '@/types/Auth.types'
import { Tables } from '@/types/supabase.types'
import { v4 } from 'uuid'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { SupabaseCustomService } from '@/utils/supabase/service'

type BuySellReturns = {
   user: Tables<'UserMainData'>
   transactions: Tables<'Transactions'>[]
}

export async function BuySecurities(
   Securities: (Omit<
      TTransactionsList,
      | 'created_at'
      | 'user_id'
      | 'transaction_type'
      | 'remainder'
      | 'transaction_id'
   > & { secID: string })[]
) {
   return TryCatch<BuySellReturns>(async () => {
      if (Securities.length <= 0) throw new Error('Список покупок пуст')

      const { data: prevUserData, error: prevError } = await GetUserMainData()
      const supabase = SupabaseCustomServer()
      const supabaseService = SupabaseCustomService()
      const { user } = await getSupabaseUser(supabase)

      const newTransactions: TTransactionsList[] = []
      const newPurchase: TPurchasesList[] = []

      if (prevUserData?.purchases) newPurchase.push(...prevUserData.purchases)

      let balance = prevUserData?.current_money || 0
      let full_price = 0

      for (const security of Securities) {
         if (security.quantity <= 0)
            throw new Error(`Количество ${security.secID} не может быть <= 0`)

         const current_purchase = newPurchase?.findIndex(
            (item) => item.secID === security.secID
         )

         const id = v4()

         full_price += security.price * security.quantity
         newTransactions.push({
            ...security,
            transaction_id: id,
            transaction_type: 'buy',
            created_at: new Date(),
            user_id: user.id,
            remainder: security.quantity,
         })

         if (current_purchase >= 0) {
            const item = newPurchase[current_purchase]
            newPurchase[current_purchase] = {
               ...item,
               transaction_id: item.transaction_id.concat(id),
            }
         } else {
            newPurchase.push({
               transaction_id: [id],
               secID: security.secID,
               image: security.image,
               type: security.security_type,
            })
         }
      }

      balance = balance - full_price

      if (!prevUserData?.current_money)
         throw new Error(prevError || 'Ошибка получения данных')

      if (balance < 0) throw new Error('Недостаточно средств')

      if (!newTransactions) throw new Error('Ошибка создания транзакции')

      const { data: TransactionData, error: TransactionError } =
         await supabaseService
            .from('Transactions')
            .insert(newTransactions)
            .eq('user_id', user.id)
            .select()

      const { data: newUserData, error: newError } = await UpdateUserMainData({
         purchases: newPurchase,
         current_money: balance,
      })
      if (!newUserData || newError || TransactionError || !TransactionData)
         throw TransactionError || new Error(newError || 'Ошибка транзакции')

      return { data: { user: newUserData, transactions: TransactionData } }
   })
}

export async function SellSecurities(
   Securities: Omit<
      TTransactionsList,
      | 'transaction_type'
      | 'remainder'
      | 'transaction_id'
      | 'created_at'
      | 'user_id'
   >[]
) {
   return TryCatch<BuySellReturns>(async () => {
      if (Securities.length <= 0)
         throw new Error('Вы ничего не выставляете на продажу')

      const { data: prevUserData, error: prevError } = await GetUserMainData()
      const supabase = SupabaseCustomServer()
      const supabaseService = SupabaseCustomService()
      const { user } = await getSupabaseUser(supabase)
      const { data: transactionsDataBase, error: transactionsError } =
         await supabaseService
            .from('Transactions')
            .select()
            .eq('user_id', user.id)
            .gt('remainder', 0)
            .eq('transaction_type', 'buy')
            .order('price', { ascending: true })

      const newTransactions: TTransactionsList[] = []

      if (!prevUserData || !prevUserData.start_money)
         throw new Error('Ошибка получения данных')

      if (transactionsError || !transactionsDataBase)
         throw (
            transactionsError ||
            new Error('Ошибка получения данных о проведенных транзакциях')
         )

      let newPurchase = prevUserData.purchases || []
      let balancePlus = 0
      let buy_price = 0

      for (const security of Securities) {
         const transactions = transactionsDataBase?.filter(
            (item) => item.secID === security.secID
         )

         if (!transactions) continue

         const { quantity: userHas } = getTransactionInfo(
            transactions.map((item) => item.transaction_id),
            transactions
         )

         if (security.quantity > userHas)
            throw new Error('У вас недостаточно ценных бумаг')

         let rest = security.quantity

         for (const tr of transactions) {
            if (rest <= 0) break

            if (tr.remainder > rest) {
               newTransactions.push({ ...tr, remainder: tr.remainder - rest })
               buy_price += rest * tr.price
               rest = 0
            }

            if (tr.remainder <= rest) {
               newTransactions.push({
                  ...tr,
                  remainder: tr.remainder - tr.remainder,
               })
               rest -= tr.remainder

               buy_price += tr.remainder * tr.price

               const current_purchase = newPurchase.findIndex(
                  (item) => item.secID === security.secID
               )

               if (current_purchase >= 0) {
                  const tr_transaction_id =
                     newPurchase[current_purchase].transaction_id

                  tr_transaction_id.length <= 1
                     ? (newPurchase = newPurchase.filter(
                          (item) => item.secID !== security.secID
                       ))
                     : (newPurchase[current_purchase].transaction_id =
                          tr_transaction_id.filter(
                             (item) => item !== tr.transaction_id
                          ))
               }
            }
         }
         newTransactions.push({
            ...security,
            transaction_id: v4(),
            transaction_type: 'sell',
            remainder: security.quantity,
            created_at: new Date(),
            user_id: user.id,
         })
         balancePlus += security.quantity * security.price
      }

      const { data: updatedTransactions, error: updatedTransactionsError } =
         await supabaseService
            .from('Transactions')
            .upsert(newTransactions)
            .eq('user_id', user.id)
            .select()

      const { data: updatedUser, error: updatedUserError } =
         await UpdateUserMainData({
            purchases: newPurchase,
            current_money: prevUserData.current_money + balancePlus,
            start_money: prevUserData.start_money + (balancePlus - buy_price),
         })

      if (updatedUserError || !updatedUser)
         throw (
            updatedUserError ||
            new Error('Не удалось обновить данные пользователя')
         )
      if (!updatedTransactions || updatedTransactionsError)
         throw (
            updatedTransactionsError ||
            new Error('Не удалось обновить данные об транзакциях')
         )

      return {
         data: {
            user: updatedUser,
            transactions: [...transactionsDataBase, ...updatedTransactions],
         },
      }
   })
}
