import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { getCurrentStock } from '@/actions/Stocks'
import ControlPanel from '@/components/widgets/ControlPanel'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import TransformSecurityData from '@/utils/TransformSecurityData'
import { URLList } from '@/utils/const'
import CustomTabs from '@/components/entity/CustomElements/CustomTabs'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import { redirect } from 'next/navigation'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getCoupons } from '@/actions/Bonds'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import BondsContent from '@/components/pages/BondsContent'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentStock(secID)

   const defaultMeta = {
      title: 'Облигация с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: 'Облигация с московской биржи',
         authors: 'Московская биржа',
      },
      twitter: {
         title: 'Облигация с московской биржи',
      },
   }

   if (!data || error) return defaultMeta

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return defaultMeta

   return {
      title: `${title[valueIndex]} - ${code[valueIndex]}`,
      description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
         description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
         authors: 'Московская биржа',
      },
      twitter: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
         description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
      },
   }
}

export default async function CurrentBond({
   params: { secID },
}: {
   params: { secID: string }
}) {
   return (
      <div className="animate-appearance">
         <ControlPanel />
         <Suspense fallback={<CenterScreenLoader />}>
            <BondsContent secID={secID} />
         </Suspense>
      </div>
   )
}
