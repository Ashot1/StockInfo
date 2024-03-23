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
      title: title[valueIndex] as string,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: title[valueIndex] as string,
         authors: 'Московская биржа',
      },
      twitter: {
         title: title[valueIndex] as string,
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
            <SecurityMainContent
               secID={secID}
               prevLink={URLList.bonds}
               img={`/Logos/Bonds/${secID}.png`}
            />
         </Suspense>
      </div>
   )
}
