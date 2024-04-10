import { getCurrentStock, getDividends } from '@/actions/Stocks'
import SecurityTemplate from '@/components/module/SecurityTemplate'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { DividendsRequest } from '@/types/Stocks.types'
import { ConvertDate } from '@/utils/ConvertDate'
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

   const title = data[1].description.find((item) => item.name === 'SHORTNAME')
      ?.value
   const code = data[1].description.find((item) => item.name === 'SECID')?.value

   if (!title || !code) return defaultMeta

   return {
      title: `${title} - ${code}`,
      description: `Основная информация об ${title} (${code})`,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         authors: 'Московская биржа',
      },
      twitter: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
      },
   }
}

export default async function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const stockReq = getCurrentStock(secID)
   const dividentsReq = getDividends(secID)

   const [stockRes, dividentsRes] = await Promise.all([stockReq, dividentsReq])

   const { data: DividendsData, error: DividendsError } = dividentsRes
   const { data, error } = stockRes

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
         <SecurityTemplate
            type="Stock"
            data={data}
            error={error}
            secondsContent={dividentContent}
            secID={secID}
            url={`${URLList.logos_stock}/${secID}.svg`}
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

   const content = DividendsData[1].dividends.map((item) => [
      ConvertDate(`${item.registryclosedate}`, false),
      `${item.value} ${item.currencyid}`,
   ])

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
