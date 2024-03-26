import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { getCurrentStock, getDividends } from '@/actions/Stocks'
import ControlPanel from '@/components/widgets/ControlPanel'
import TransformSecurityData from '@/utils/TransformSecurityData'
import StocksContent from '@/components/pages/StocksContent'

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

export default async function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   return (
      <div className="animate-appearance">
         <ControlPanel />
         <Suspense fallback={<CenterScreenLoader />}>
            <StocksContent secID={secID} />
         </Suspense>
      </div>
   )
}
