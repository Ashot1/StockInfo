import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import CustomTabs, {
   TabsContentType,
} from '@/components/entity/CustomElements/CustomTabs'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import { CurrentStockRequest } from '@/types/Stocks.types'
import CustomChart from '@/components/entity/CustomElements/CustomChart'
import { ConvertDate } from '@/utils/Date'
import { ChartData, Point } from 'chart.js'
import { PriceListType } from '@/types/Security.types'
import { FavoritesListTypes } from '@/types/Auth.types'

async function checkImageExists(imageUrl: string) {
   const response = await fetch(process.env.NEXT_PUBLIC_SITEURL + imageUrl, {
      method: 'HEAD',
   })
   return response.status === 200
}

export type SecurityTemplateProps = {
   secID: string
   secondsContent?: TabsContentType
   image: string
   data?: CurrentStockRequest
   error?: string
   type: FavoritesListTypes
   priceList?: PriceListType[]
   MarketData?: Partial<{
      open: number
      low: number
      high: number
      last: number
      prev: number
   }>
   code?: string
   title?: string
}

export default async function SecurityTemplate({
   secID,
   secondsContent,
   image,
   data,
   error,
   type,
   priceList,
   MarketData,
   title,
   code,
}: SecurityTemplateProps) {
   if (!data || error) return redirect(URLList.notFound)

   const description = data[1].description

   let secCode = code
   let secTitle = title

   if (!secCode)
      secCode = description.find((item) => item.name === 'SECID')?.value || ''
   if (!secTitle)
      secTitle = description.find((item) => item.name === 'NAME')?.value || ''

   const Info: TabsContentType[] = [
      {
         name: 'Основная информация',
         value: 'mainInfo',
         component: <SecurityInfoList currencyList={description} />,
      },
   ]

   if (secondsContent) Info.push(secondsContent)

   const isValid = await checkImageExists(image)

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
      <div className="flex animate-appearance flex-col gap-16">
         <SecurityMainInfo
            type={type}
            secCode={secCode}
            secTitle={secTitle}
            secID={secID}
            img={image}
            MarketData={MarketData}
         />
         {priceData && (
            <CustomChart
               img={isValid ? image : '/StockPlaceHolder.png'}
               data={priceData}
               className={isValid ? '' : 'dark:invert'}
            />
         )}
         <CustomTabs content={Info} />
      </div>
   )
}
