import { getCurrentStock, getDividends } from '@/actions/Stocks'
import { URLList } from '@/utils/const'
import { redirect } from 'next/navigation'
import TransformSecurityData from '@/utils/TransformSecurityData'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { DividendsRequest } from '@/types/Stocks.types'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import CustomTabs from '@/components/entity/CustomElements/CustomTabs'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import { ConvertDate } from '@/utils/ConvertDate'

export default async function StocksContent({ secID }: { secID: string }) {
   const { data, error } = await getCurrentStock(secID)

   const { data: DividendsData, error: DividendsError } =
      await getDividends(secID)

   if (!data || error || !data.description.data.length)
      return redirect(URLList.notFound)

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return

   const Info = [
      {
         name: 'Основная информация',
         value: 'mainInfo',
         component: (
            <SecurityInfoList
               currencyList={StockInfoData}
               titleIndex={titleIndex}
               valueIndex={valueIndex}
               nameIndex={nameIndex}
            />
         ),
      },
      {
         name: 'Дивиденты',
         value: 'dividends',
         component:
            DividendsData && !DividendsError ? (
               <DividentsList DividendsData={DividendsData} />
            ) : (
               <EmptyListText text={DividendsError || 'Не найдено'} />
            ),
      },
   ]

   return (
      <>
         <SecurityMainInfo
            secCode={code[valueIndex] as string}
            secTitle={title[valueIndex] as string}
            secID={secID}
            prevLink={URLList.stocks}
            img={`/Logos/Stocks/${secID}.svg`}
         />
         <CustomTabs content={Info} />
      </>
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
