'use client'

import { FC, useContext } from 'react'
import { cn } from '@/utils/utils'
import CustomModal from '@/components/entity/CustomElements/CustomModal'
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog'
import TransactionModalContent, {
   TransactionInputs,
   TransactionsBuyModalContentProps,
} from '@/components/entity/ModalsContent/Transactions/TransactionModalContent'
import { SubmitHandler } from 'react-hook-form'
import { BuySecurities, SellSecurities } from '@/actions/UserInteraction'
import toast from 'react-hot-toast'
import { AuthContext } from '@/hoc/AuthProvider'
import { FavoritesListTypes } from '@/types/Auth.types'

export type TransactionsButtonsProps = Omit<
   TransactionsBuyModalContentProps,
   'needAdditionalyCan' | 'submit' | 'text'
> & { type: FavoritesListTypes }

const TransactionsButtons: FC<TransactionsButtonsProps> = ({
   className,
   secID,
   secTitle,
   secCode,
   image,
   current_price,
   type,
}) => {
   const { setMainInfo, mainInfo } = useContext(AuthContext)

   const Buy: SubmitHandler<TransactionInputs> = async ({ Quantity }) => {
      const { data, error } = await BuySecurities([
         {
            secID: secID,
            image: secID,
            quantity: parseInt(Quantity),
            security_type: type,
         },
      ])
      if (!data || error) return toast.error(error || 'Ошибка изменения')

      if (setMainInfo)
         setMainInfo({
            ...data.user,
            transactions: mainInfo.transactions?.concat(data.transactions),
         })

      toast.success('Покупка совершена')
   }

   const Sell: SubmitHandler<TransactionInputs> = async ({ Quantity }) => {
      const { data, error } = await SellSecurities([
         {
            secID: secID,
            quantity: parseInt(Quantity),
            security_type: type,
            image: secID,
         },
      ])

      if (!data || error) return toast.error(error || 'Ошибка изменения')

      if (setMainInfo)
         setMainInfo({ ...data.user, transactions: data.transactions })

      toast.success('Успешная продажа')
   }

   return (
      <div className={cn('flex gap-3', className)}>
         <CustomModal
            text="Купить"
            classNameTrigger="px-4 py-1.5 text-sm border-2 border-transparent hover:border-[var(--grayBG)] sticky top-2"
         >
            <DialogBody>
               <TransactionModalContent
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
               <TransactionModalContent
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

export default TransactionsButtons
