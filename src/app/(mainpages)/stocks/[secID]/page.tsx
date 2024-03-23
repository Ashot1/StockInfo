import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { getCurrentStock } from '@/actions/Stocks'
import ControlPanel from '@/components/widgets/ControlPanel'
import SecurityMainContent from '@/components/widgets/SecurityMainContent'
import TransformSecurityData from '@/utils/TransformSecurityData'
import { URLList } from '@/utils/const'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentStock(secID)

   const defaultMeta = {
      title: 'Акция с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: 'Акция с московской биржи',
         authors: 'Московская биржа',
      },
      twitter: {
         title: 'Акция с московской биржи',
      },
   }

   if (!data || error) return defaultMeta

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return defaultMeta

   return {
      title: `${title[valueIndex]} - ${code[valueIndex]}`,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
         authors: 'Московская биржа',
      },
      twitter: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
      },
   }
}

export default async function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   return (
      <div className="animate-appearance">
         <ControlPanel />
         <Suspense fallback={<CenterScreenLoader />}>
            <SecurityMainContent
               secID={secID}
               prevLink={URLList.stocks}
               img={`/Logos/Stocks/${secID}.svg`}
            />
         </Suspense>
      </div>
   )
}
