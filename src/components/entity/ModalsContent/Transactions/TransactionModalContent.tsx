'use client'

import { FC, useContext } from 'react'
import SecurityFace, { SecurityFaceProps } from '@/components/ui/SecurityFace'
import { Button } from '@/components/ui/ShadCN/button'
import { nunito } from '@/utils/fonts'
import StyledInput from '@/components/ui/StyledInput'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { AuthContext } from '@/hoc/AuthProvider'
import { CompleteDivision, getTransactionInfo } from '@/utils/utils'
import { TPurchasesList, TTransactionsList } from '@/types/Auth.types'

export type TransactionInputs = { Quantity: string }

export type TransactionsBuyModalContentProps = Omit<
   SecurityFaceProps,
   'variant' | 'type'
> & {
   current_price: number
   submit: SubmitHandler<TransactionInputs>
   text: string
   needAdditionalyCan?: boolean
}

const TransactionModalContent: FC<TransactionsBuyModalContentProps> = ({
   secCode,
   secID,
   secTitle,
   image,
   className,
   current_price,
   submit,
   text,
   needAdditionalyCan = true,
}) => {
   const context = useContext(AuthContext)
   const mainInfo = context.mainInfo

   return (
      <>
         <SecurityFace
            variant="vertical"
            secID={secID}
            secCode={secCode}
            secTitle={secTitle}
            image={image}
         />
         <AdditionalInfo
            text={text}
            purchases={mainInfo?.purchases}
            secID={secID}
            transactions={mainInfo?.transactions}
            current_price={current_price}
            current_money={mainInfo?.current_money}
            needAdditionalyCan={needAdditionalyCan}
         />
         <Controls Submit={submit} text={text} />
      </>
   )
}

export default TransactionModalContent

const Controls: FC<{
   Submit: SubmitHandler<TransactionInputs>
   text: string
}> = ({ Submit, text }) => {
   const {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitting },
      control,
   } = useForm<TransactionInputs>({ mode: 'onSubmit' })

   const {
      field: { name, value, onChange },
   } = useController({ name: 'Quantity', control })

   return (
      <form className="mt-10 block" onSubmit={handleSubmit(Submit)}>
         <StyledInput<TransactionInputs>
            name={name}
            value={value}
            onChange={onChange}
            error={errors.Quantity}
            type="number"
            title="Количество"
            register={register}
            defaultValue={value}
            background="peer-focus:bg-[var(--background)]"
            options={{
               required: {
                  value: true,
                  message: 'Вы должны указать количество',
               },
            }}
         />
         <div className="grid w-full place-items-center">
            <Button variant="secondary">{text}</Button>
         </div>
      </form>
   )
}

const AdditionalInfo: FC<
   {
      purchases?: TPurchasesList[] | null
      transactions?: TTransactionsList[] | null
      current_money?: number
      text: string
   } & Pick<
      TransactionsBuyModalContentProps,
      'current_price' | 'secID' | 'needAdditionalyCan'
   >
> = ({
   transactions,
   purchases,
   current_price,
   secID,
   current_money,
   text,
   needAdditionalyCan,
}) => {
   const formated_price = Intl.NumberFormat('ru-RU', {
      currency: 'RUB',
      style: 'currency',
      maximumFractionDigits: 3,
   }).format(current_price)

   const item_in_purchase = purchases?.find((item) => item.secID === secID)

   let amount = 0

   if (item_in_purchase && transactions) {
      const { quantity } = getTransactionInfo(
         item_in_purchase.transaction_id,
         transactions
      )
      amount = quantity
   }

   return (
      <>
         <p
            className={`mt-6 w-full text-center opacity-80 ${nunito.className}`}
         >
            Цена: {formated_price}
         </p>

         <p className="mt-2 w-full text-center text-xs opacity-50">
            У вас есть {amount} шт.
         </p>

         {current_money && needAdditionalyCan && (
            <p className="mt-1 w-full text-center text-xs opacity-50">
               Вы можете {text} {CompleteDivision(current_money, current_price)}{' '}
               шт.
            </p>
         )}
      </>
   )
}
