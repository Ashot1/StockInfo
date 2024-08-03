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
import { DialogDescription, DialogTitle } from '@/components/ui/ShadCN/dialog'

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
         const tID = toast.loading('Производится транзакция...')

         const { data, error } = await func([
            {
               secID: secID,
               image: secID,
               quantity: parseInt(Quantity),
               security_type: type,
            },
         ])
         if (!data || error) throw new Error(error || text.error)

         return { successMessage: text.success, data, toastID: tID }
      },
      onError: (error) => toast.error(error.message),
      onSuccess: async ({ successMessage, data, toastID }) => {
         if (setMainInfo)
            setMainInfo({
               ...data.user,
               transactions: mainInfo.transactions
                  ? [...data.transactions, ...mainInfo.transactions]
                  : data.transactions,
            })

         await queryClient.invalidateQueries({ queryKey: [queryKeys.Purchase] })

         toast.success(successMessage, { id: toastID })
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
               <DialogTitle className="h-0 overflow-hidden">
                  Приобретение активов
               </DialogTitle>
               <DialogDescription className="h-0 overflow-hidden">
                  Покупка акции, облигации или валюты
               </DialogDescription>
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
               <DialogTitle className="h-0 overflow-hidden">
                  Продажа активов
               </DialogTitle>
               <DialogDescription className="h-0 overflow-hidden">
                  Реализуйте акции, облигации и валюту.
               </DialogDescription>
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
