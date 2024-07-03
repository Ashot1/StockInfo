'use client'

import { FC } from 'react'
import SecurityFace, { SecurityFaceProps } from '@/components/ui/SecurityFace'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { FormatedTransactionsListType } from '@/components/module/Transactions'
import { ConvertDate } from '@/utils/Date'
import Link from 'next/link'

export type TransactionsModalContentProps = Required<SecurityFaceProps> &
   Omit<FormatedTransactionsListType, 'transaction_id' | 'time' | 'Title'> & {
      link: string
   }

type InfoProps = Omit<
   FormatedTransactionsListType,
   'transaction_id' | 'time' | 'Title' | 'image' | 'secID'
>

const TransactionsModalContent: FC<TransactionsModalContentProps> = ({
   image,
   type,
   secID,
   secCode,
   variant,
   className,
   secTitle,
   link,
   ...props
}) => {
   return (
      <>
         <Link href={link}>
            <SecurityFace
               className={className}
               variant={variant}
               secTitle={secTitle}
               secCode={secCode}
               secID={secID}
               image={image}
            />
         </Link>
         <Info {...props} />
      </>
   )
}

const Info: FC<InfoProps> = ({
   transaction_type,
   security_type,
   remainder,
   created_at,
   price,
   quantity,
}) => {
   const date = ConvertDate(created_at)

   return (
      <CustomTable
         caption="Таблица с подробной информацией о транзакции"
         header={[{ text: 'Параметр' }, { text: 'Значение' }]}
         content={[
            ['Тип транзакции', transaction_type],
            ['Тип бумаги', security_type],
            ['Количество', `${quantity}`],
            ['Из них осталось', `${remainder}`],
            ['Цена', `${price}`],
            ['Дата', date],
         ]}
      />
   )
}

export default TransactionsModalContent
