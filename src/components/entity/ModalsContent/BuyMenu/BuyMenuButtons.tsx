'use client'

import { FC } from 'react'
import { cn } from '@/utils/utils'
import CustomModal from '@/components/entity/CustomElements/CustomModal'
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog'
import BuyMenuModalContent, {
   TransactionInputs,
   TransactionsBuyModalContentProps,
} from '@/components/entity/ModalsContent/BuyMenu/BuyMenuModalContent'
import { SubmitHandler } from 'react-hook-form'
import { BuySecurities, SellSecurities } from '@/actions/UserInteraction'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { FavoritesListTypes } from '@/types/Auth.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/utils/config'

export type TransactionsButtonsProps = Omit<
   TransactionsBuyModalContentProps,
   'needAdditionalyCan' | 'submit' | 'text'
> & { type: FavoritesListTypes }

type MutationProps = {
   func: typeof BuySecurities
   Quantity: string
   text: { error: string; success: string }
}

const BuyMenuButtons: FC<TransactionsButtonsProps> = ({
   className,
   secID,
   secTitle,
   secCode,
   image,
   current_price,
   type,
}) => {
   const { setMainInfo, mainInfo } = useAuthContext()
   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: async ({ func, Quantity, text }: MutationProps) => {
         const { data, error } = await func([
            {
               secID: secID,
               image: secID,
               quantity: parseInt(Quantity),
               security_type: type,
            },
         ])
         if (!data || error) throw new Error(error || text.error)

         return { successMessage: text.success, data }
      },
      onError: (error) => toast.error(error.message),
      onSuccess: async ({ successMessage, data }) => {
         if (setMainInfo)
            setMainInfo({
               ...data.user,
               transactions: mainInfo.transactions
                  ? [...data.transactions, ...mainInfo.transactions]
                  : data.transactions,
            })

         await queryClient.invalidateQueries({ queryKey: [queryKeys.Purchase] })

         toast.success(successMessage)
      },
   })

   const Buy: SubmitHandler<TransactionInputs> = ({ Quantity }) => {
      mutation.mutate({
         func: BuySecurities,
         Quantity,
         text: { success: 'Покупка совершена', error: 'Ошибка при покупке' },
      })
   }

   const Sell: SubmitHandler<TransactionInputs> = async ({ Quantity }) => {
      mutation.mutate({
         func: SellSecurities,
         Quantity,
         text: { success: 'Успешная продажа', error: 'Ошибка при продаже' },
      })
   }

   return (
      <div className={cn('flex gap-3', className)}>
         <CustomModal
            text="Купить"
            classNameTrigger="px-4 py-1.5 text-sm border-2 border-transparent hover:border-[var(--grayBG)] sticky top-2"
         >
            <DialogBody>
               <BuyMenuModalContent
                  secID={secID}
                  secTitle={secTitle}
                  secCode={secCode}
                  current_price={current_price}
                  image={image}
                  submit={Buy}
                  text="Купить"
               />
            </DialogBody>
         </CustomModal>

         <CustomModal
            text="Продать"
            classNameTrigger="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-1.5 text-sm"
         >
            <DialogBody>
               <BuyMenuModalContent
                  secID={secID}
                  secTitle={secTitle}
                  secCode={secCode}
                  current_price={current_price}
                  image={image}
                  submit={Sell}
                  needAdditionalyCan={false}
                  text="Продать"
               />
            </DialogBody>
         </CustomModal>
      </div>
   )
}

export default BuyMenuButtons
