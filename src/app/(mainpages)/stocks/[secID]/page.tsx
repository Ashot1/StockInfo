import { getCurrentStock, getDividends } from '@/actions/Stocks'
import ControlPanel from '@/components/widgets/ControlPanel'
import TransformSecurityData from '@/utils/TransformSecurityData'
import SecurityTemplate from '@/components/module/SecurityTemplate'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { DividendsRequest } from '@/types/Stocks.types'
import { ConvertDate } from '@/utils/ConvertDate'

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
   const { data: DividendsData, error: DividendsError } =
      await getDividends(secID)

   const dividentContent = {
      name: 'Дивиденты',
      value: 'dividends',
      component:
         DividendsData && !DividendsError ? (
            <DividentsList DividendsData={DividendsData} />
         ) : (
            <EmptyListText text={DividendsError || 'Не найдено'} />
         ),
   }

   return (
      <div className="animate-appearance">
         <ControlPanel />
         <SecurityTemplate
            secondsContent={dividentContent}
            secID={secID}
            url={`/Logos/Stocks/${secID}.svg`}
         />
      </div>
   )
}

const DividentsList = ({
   DividendsData,
}: {
   DividendsData: DividendsRequest
}) => {
   const header = [{ text: 'Дата' }, { text: 'Выплата' }]

   const columns = DividendsData.dividends.columns
   const date = columns.indexOf('registryclosedate')
   const price = columns.indexOf('value')
   const currency = columns.indexOf('currencyid')

   const content = DividendsData.dividends.data.map((item) => [
      ConvertDate(`${item[date]}`, false),
      `${item[price]} ${item[currency]}`,
   ])

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
