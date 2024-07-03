'use client'

import { cn, convertMoney, getDataByType } from '@/utils/utils'
import { ElementType, FC, Fragment } from 'react'
import { FormatedTransactionsListType } from '@/components/module/Transactions'
import CustomModal, {
   TCustomModal,
} from '@/components/entity/CustomElements/CustomModal'
import CustomModalContent from '@/components/ui/HightOrder/CustomModalContent'
import { IModalContent } from '@/types/Modals.types'
import TransactionsModalContent from '@/components/entity/ModalsContent/Transactions/TransactionsModalContent'
import ScrollBlock from '@/components/ui/HightOrder/ScrollBlock'
import { bellota, comfortaa } from '@/utils/fonts'
import ImageErrorCheck from '@/components/ui/Img/ImageErrorCheck'

export type TransactionListItemProps = {
   CustomComponent?: ElementType
} & (withoutTime | WithTime) &
   Omit<FormatedTransactionsListType, 'time' | 'created_at'> &
   Pick<IModalContent, 'type'> &
   Pick<TCustomModal, 'className' | 'classNameTrigger'>

type WithTime = {
   time: string
   date: Date
}

type withoutTime = {
   date?: never
   time?: never
}

type ModalTriggerProps = Pick<
   TransactionListItemProps,
   | 'date'
   | 'time'
   | 'CustomComponent'
   | 'price'
   | 'quantity'
   | 'transaction_type'
   | 'secID'
   | 'image'
   | 'Title'
>

export default function TransactionListItem({
   type,
   transaction_id,
   className,
   classNameTrigger,
   ...props
}: TransactionListItemProps) {
   const { img, url } = getDataByType({
      SECID: props.secID,
      imgSRC: props.image,
   })

   const timeCondition = !!props.time && !!props.date

   return (
      <CustomModal
         className={cn('p-1 pl-2', className)}
         text={<ModalTrigger {...props} image={img[props.security_type]} />}
         classNameTrigger={cn(
            'grid flex-1 group',
            timeCondition ? 'grid-cols-2 768p:grid-cols-3' : 'grid-cols-2',
            classNameTrigger
         )}
      >
         <ScrollBlock className="max-h-[80dvh] pt-6">
            <CustomModalContent
               title="Подробная информация о транзакции"
               description={transaction_id}
               type={type}
            >
               <TransactionsModalContent
                  className="mt-6"
                  {...props}
                  link={url[props.security_type]}
                  image={img[props.security_type]}
                  created_at={props.date || new Date()}
                  secCode={props.secID}
                  secTitle={props.Title}
                  type={props.security_type}
                  variant="vertical"
               />
            </CustomModalContent>
         </ScrollBlock>
      </CustomModal>
   )
}

const ModalTrigger: FC<ModalTriggerProps> = ({
   time,
   date,
   CustomComponent,
   transaction_type,
   Title,
   price,
   quantity,
   image,
   secID,
}) => {
   const timeCondition = !!time && !!date
   const Component = CustomComponent || Fragment

   return (
      <Component>
         <MainBlock image={image} secID={secID} secTitle={Title} />
         {timeCondition && <TimeBlock time={time} date={date} />}
         <PriceBlock
            price={price}
            quantity={quantity}
            transaction_type={transaction_type}
         />
      </Component>
   )
}

const TimeBlock: FC<{ time: string; date: Date }> = ({ time, date }) => {
   return (
      <time
         className={cn(
            'col-start-2 row-start-2 flex justify-center text-xs duration-300 300p:group-hover:-translate-x-3 768p:row-start-1 768p:items-center 768p:text-base 768p:group-hover:translate-x-0',
            bellota.className
         )}
         dateTime={new Date(date).toISOString()}
      >
         {time}
      </time>
   )
}

const PriceBlock: FC<
   Pick<TransactionListItemProps, 'price' | 'quantity' | 'transaction_type'>
> = ({ price, transaction_type, quantity }) => {
   const isBuy = transaction_type === 'buy'

   return (
      <div
         className={cn(
            'col-start-2 flex justify-center text-sm duration-300 300p:group-hover:-translate-x-3 768p:col-start-3 768p:items-center 768p:text-base',
            !isBuy && 'text-green-800'
         )}
      >
         {isBuy ? '-' : '+'} {convertMoney(price * quantity)}
      </div>
   )
}

const MainBlock: FC<{ image: string; secID: string; secTitle: string }> = ({
   image,
   secID,
   secTitle,
}) => {
   return (
      <div
         className={cn(
            'row-span-2 flex items-center gap-2 768p:row-span-1',
            comfortaa.className
         )}
      >
         <div className="relative size-12 min-w-12 -translate-x-0.5 overflow-hidden rounded-full duration-300 group-hover:-translate-y-3 1024p:size-14">
            <ImageErrorCheck
               alt={secID}
               defaultSrc="/StockPlaceHolder.png"
               src={image}
               className="shadow-lg"
            />
         </div>
         <span className="duration-300 300p:group-hover:translate-x-3">
            <h4 className="text-left text-sm">{secTitle}</h4>
            <p className="text-left text-xs opacity-50">{secID}</p>
         </span>
      </div>
   )
}
