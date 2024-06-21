'use server'

import { getTransactionInfo, TryCatch } from '@/utils/utils'
import {
   getSupabaseUser,
   GetUserMainData,
   UpdateUserMainData,
} from '@/actions/Account/Account'
import {
   TFavoritesList,
   TPurchasesList,
   TTransactionsList,
} from '@/types/Auth.types'
import { Tables } from '@/types/supabase.types'
import { v4 } from 'uuid'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { SupabaseCustomService } from '@/utils/supabase/service'
import { FetchFavorites } from '@/actions/Account/Client'

type BuySellReturns = {
   user: Tables<'UserMainData'>
   transactions: Tables<'Transactions'>[]
}

export async function BuySecurities(
   Securities: Pick<
      TTransactionsList,
      'quantity' | 'image' | 'secID' | 'security_type'
   >[]
) {
   return TryCatch<BuySellReturns>(async () => {
      if (Securities.length <= 0) throw new Error('Список покупок пуст')

      // получим данные о пользователе и бумагах, создаем клиенты
      const { data: prevUserData, error: prevError } = await GetUserMainData()
      const supabase = SupabaseCustomServer()
      const supabaseService = SupabaseCustomService()
      const { user } = await getSupabaseUser(supabase)

      const FormatedSecList: TFavoritesList[] = Securities.map((item) => ({
         type: item.security_type,
         secID: item.secID,
         image: item.image,
      }))

      const { data: SecuritiesData, error: SecuritiesDataError } =
         await FetchFavorites(FormatedSecList)

      if (SecuritiesDataError || !SecuritiesData || SecuritiesData.length <= 0)
         throw (
            SecuritiesDataError ||
            new Error('Ошибка получения данных об акциях')
         )

      // создаем переменные с новыми данными, для последующего заполнения и замены предыдущих в бд
      const newTransactions: TTransactionsList[] = []
      const newPurchase: TPurchasesList[] = []

      if (prevUserData?.purchases) newPurchase.push(...prevUserData.purchases)

      let balance = prevUserData?.current_money || 0
      let full_price = 0

      // создаем map с данными о бумаге для быстрого получения через map.get и проходимся по каждой бумаге в список покупок
      const SecuritiesInfo = new Map(
         SecuritiesData.map((sec) => [sec.SECID, { ...sec }])
      )

      for (let security of Securities) {
         // получаем данные о текущей бумаге
         const CurrentInfo = SecuritiesInfo.get(security.secID)

         // проверяем все данные
         if (!CurrentInfo || !CurrentInfo?.price) continue

         if (security.quantity <= 0)
            throw new Error(
               `Количество ${security.secID} не может быть меньше 1`
            )

         if (CurrentInfo.price <= 0)
            throw new Error(`Цена ${security.secID} меньше 1`)

         // получаем информацию об уже совершенных покупках этой акции, чтобы добавить туда текущую или создать новую
         const current_purchase = newPurchase?.findIndex(
            (item) => item.secID === security.secID
         )

         // добавляем нынешнюю транзакцию в ранее созданные массивы с новыми данными об покупках
         const id = v4()

         full_price += CurrentInfo.price * security.quantity
         newTransactions.push({
            ...security,
            transaction_id: id,
            transaction_type: 'buy',
            created_at: new Date(),
            user_id: user.id,
            remainder: security.quantity,
            price: CurrentInfo.price,
            Title: CurrentInfo.SHORTNAME,
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

      // вычитаем с баланса стоимость всех покупок и проверяем, не 0 ниже ли он
      balance = balance - full_price

      if (!prevUserData?.current_money)
         throw new Error(prevError || 'Ошибка получения данных')

      if (balance < 0) throw new Error('Недостаточно средств')

      if (!newTransactions) throw new Error('Ошибка создания транзакции')

      // обновляем данные в базе
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
   Securities: Pick<
      TTransactionsList,
      'quantity' | 'image' | 'secID' | 'security_type'
   >[]
) {
   return TryCatch<BuySellReturns>(async () => {
      if (Securities.length <= 0)
         throw new Error('Вы ничего не выставляете на продажу')

      // получаем данные о пользователе и бумагах
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

      if (!prevUserData || !prevUserData.start_money)
         throw new Error('Ошибка получения данных')

      if (transactionsError || !transactionsDataBase)
         throw (
            transactionsError ||
            new Error('Ошибка получения данных о проведенных транзакциях')
         )

      const FormatedSecList: TFavoritesList[] = Securities.map((item) => ({
         type: item.security_type,
         secID: item.secID,
         image: item.image,
      }))

      const { data: SecuritiesData, error: SecuritiesDataError } =
         await FetchFavorites(FormatedSecList)

      if (SecuritiesDataError || !SecuritiesData || SecuritiesData.length <= 0)
         throw (
            SecuritiesDataError ||
            new Error('Ошибка получения данных об акциях')
         )

      // создаем переменные с новыми данными, для последующего заполнения и замены предыдущих в бд
      const newTransactions: TTransactionsList[] = []
      let newPurchase = prevUserData.purchases || []
      let balancePlus = 0
      let buy_price = 0

      // создаем map с данными о бумагах для быстрого получения через map.get и проходимся по каждой бумаге в списке на продажу
      const SecuritiesInfo = new Map(
         SecuritiesData.map((item) => [item.SECID, { ...item }])
      )
      for (const security of Securities) {
         // получаем все транзакции и данные о бумаге
         const CurrentSecInfo = SecuritiesInfo.get(security.secID)
         const transactions = transactionsDataBase?.filter(
            (item) => item.secID === security.secID
         )

         if (!transactions || !CurrentSecInfo || !CurrentSecInfo.price) continue

         const { quantity: userHas } = getTransactionInfo(
            transactions.map((item) => item.transaction_id),
            transactions
         )

         if (security.quantity > userHas)
            throw new Error('У вас недостаточно ценных бумаг')

         // создаем переменную для отслеживания количества оставшихся бумаг
         let rest = security.quantity

         // проходимся по каждой транзакции и убираем из поля "осталось" (remainder) нужное количество акций
         for (const tr of transactions) {
            // если осталось продать 0 бумаг, то выходим из цикла
            if (rest <= 0) break

            // если в транзакции бумаг больше, чем надо продать, то вычитаем
            if (tr.remainder > rest) {
               newTransactions.push({ ...tr, remainder: tr.remainder - rest })
               buy_price += rest * tr.price
               rest = 0
               continue
            }

            // если надо продать больше или столько же, сколько в транзакции осталось,
            // то убираем транзакцию из списка актуальных и вычитаем
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

         // в конце цикла, после обработки транзакций с текущей акцией, сохраняем результат в ранее созданные переменные с новыми данными
         newTransactions.push({
            ...security,
            transaction_id: v4(),
            transaction_type: 'sell',
            remainder: security.quantity,
            created_at: new Date(),
            user_id: user.id,
            price: CurrentSecInfo.price,
            Title: CurrentSecInfo.SHORTNAME,
         })
         balancePlus += security.quantity * CurrentSecInfo.price
      }

      // после обработки всех проданных бумаг обновляем данные в бд
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
