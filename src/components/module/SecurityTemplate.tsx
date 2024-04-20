import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import CustomTabs, {
   TabsContentType,
} from '@/components/entity/CustomElements/CustomTabs'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import { CurrentStockRequest } from '@/types/Stocks.types'
import { Enums } from '@/types/supabase.types'
import CustomChart from '@/components/entity/CustomElements/CustomChart'
import { ConvertDate } from '@/utils/ConvertDate'
import { ChartData, Point } from 'chart.js'
import { PriceListType } from '@/types/Security.types'

async function checkImageExists(imageUrl: string) {
   const response = await fetch(process.env.NEXT_PUBLIC_SITEURL + imageUrl, {
      method: 'HEAD',
   })
   return response.status === 200
}

export default async function SecurityTemplate({
   secID,
   secondsContent,
   url,
   data,
   error,
   type,
   priceList,
   MarketData,
}: {
   secID: string
   secondsContent: TabsContentType
   url: string
   data?: CurrentStockRequest
   error?: string
   type: Enums<'favorite_types'>
   priceList?: PriceListType[]
   MarketData?: Partial<{
      open: number
      low: number
      high: number
      last: number
   }>
}) {
   if (!data || error) return redirect(URLList.notFound)

   const description = data[1].description

   const secCode =
      description.find((item) => item.name === 'SECID')?.value || ''
   const secTitle =
      description.find((item) => item.name === 'NAME')?.value || ''

   const Info = [
      {
         name: 'Основная информация',
         value: 'mainInfo',
         component: <SecurityInfoList currencyList={description} />,
      },
      secondsContent,
   ]

   const isValid = await checkImageExists(url)

   const priceData:
      | ChartData<'line', (number | Point | null)[], unknown>
      | undefined = priceList && {
      labels: priceList.map((item) => ConvertDate(item.end, false)),
      datasets: [
         {
            data: priceList.map((item) => item.close),
            label: '₽',
         },
      ],
   }

   return (
      <div className="flex flex-col gap-16">
         <SecurityMainInfo
            type={type}
            secCode={secCode}
            secTitle={secTitle}
            secID={secID}
            img={url}
            price={MarketData?.last}
         />
         {priceData && (
            <CustomChart
               img={isValid ? url : '/StockPlaceHolder.png'}
               data={priceData}
               className={isValid ? '' : 'dark:invert'}
            />
         )}
         <CustomTabs content={Info} />
      </div>
   )
}
