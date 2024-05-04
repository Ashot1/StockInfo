import SwipeNavigator from '@/hoc/SwipeNavigator'
import { Enums } from '@/types/supabase.types'
import PriceInfoCard from '@/components/entity/PriceInfoCard'
import { SecurityTemplateProps } from '@/components/module/SecurityTemplate'
import TransactionsButtons from '@/components/entity/ModalsContent/Transactions/TransactionsButtons'
import SecurityFace from '@/components/ui/SecurityFace'

export type SecurityMainInfoProps = {
   secID: string
   img?: string
   secTitle: string
   secCode: string
   type: Enums<'favorite_types'>
} & Pick<SecurityTemplateProps, 'MarketData'>

export default function SecurityMainInfo({
   secID,
   img,
   secCode,
   secTitle,
   type,
   MarketData,
}: SecurityMainInfoProps) {
   return (
      <SwipeNavigator
         prev="RouterBack"
         className="grid w-full place-items-center gap-10 768p:grid-cols-2 768p:gap-14"
      >
         <SecurityFace
            variant="horizontal"
            secID={secID}
            secCode={secCode}
            secTitle={secTitle}
            image={img}
            type={type}
         />
         <TransactionsButtons
            type={type}
            secID={secID}
            secCode={secCode}
            secTitle={secTitle}
            image={img}
            current_price={MarketData?.last || 0}
         />
         <PriceInfoCard MarketData={MarketData} className="col-span-full" />
      </SwipeNavigator>
   )
}
