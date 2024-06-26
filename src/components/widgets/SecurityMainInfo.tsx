import SwipeNavigator from '@/hoc/SwipeNavigator'
import PriceInfoCard from '@/components/entity/PriceInfoCard'
import { SecurityTemplateProps } from '@/components/widgets/SecurityTemplate'
import BuyMenuButtons from '@/components/entity/ModalsContent/BuyMenu/BuyMenuButtons'
import SecurityFace from '@/components/ui/SecurityFace'
import { FavoritesListTypes } from '@/types/Auth.types'

export type SecurityMainInfoProps = {
   secID: string
   img?: string
   secTitle: string
   secCode: string
   type: FavoritesListTypes
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
         <BuyMenuButtons
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
