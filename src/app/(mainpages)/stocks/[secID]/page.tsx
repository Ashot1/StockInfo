import {
   getDividends,
   getStockMarketPrice,
   getStockPriceList,
} from '@/actions/Security(client)/Stocks'
import SecurityTemplate from '@/components/module/SecurityTemplate'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { DividendsRequest } from '@/types/Stocks.types'
import { ConvertDate } from '@/utils/Date'
import { URLList } from '@/utils/const'
import { getCurrentSecurity } from '@/actions/Security(client)/CommonSecurity'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentSecurity(secID)

   const defaultMeta = {
      title: 'Акция с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title: 'Акция с московской биржи',
         description: 'Основная информация об акции с московской биржи',
         authors: 'Московская биржа',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/stocks/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: 'Акция с московской биржи',
         description: 'Основная информация об акции с московской биржи',
         images: '/Preview.png',
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
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         authors: 'Московская биржа',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/stocks/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         images: '/Preview.png',
      },
   }
}

export default async function CurrentStock({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const stockReq = getCurrentSecurity(secID)
   const dividentsReq = getDividends(secID)

   const date = new Date()
   date.setMonth(date.getMonth() - 1)

   const priceListReq = getStockPriceList({
      stock: secID,
      from: date.toISOString().substring(0, 10),
   })

   const MarketDataReq = getStockMarketPrice(secID)

   const [stockRes, dividentsRes, priceListRes, MarketDataRes] =
      await Promise.all([stockReq, dividentsReq, priceListReq, MarketDataReq])

   const { data, error } = stockRes
   const { data: DividendsData, error: DividendsError } = dividentsRes
   const { data: PriceList, error: PriceListError } = priceListRes
   const { data: MarketData, error: MarketDataError } = MarketDataRes

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

   const MarketDataContent =
      MarketData &&
      MarketData[1].marketdata.find((item) => item.SECID === secID)

   const priceListCondition = PriceList && PriceList[1].candles.length > 0
   return (
      <div className="animate-appearance">
         <SecurityTemplate
            priceList={priceListCondition ? PriceList[1].candles : undefined}
            type="Stock"
            data={data}
            error={error}
            secondsContent={dividentContent}
            secID={secID}
            image={`${URLList.logos_stock}/${secID}.svg`}
            MarketData={{
               last: MarketDataContent?.LAST,
               high: MarketDataContent?.HIGH,
               low: MarketDataContent?.LOW,
               open: MarketDataContent?.OPEN,
            }}
         />
      </div>
   )
}

// Another component
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

   if (content.length == 0) return <EmptyListText text="Выплат не было" />

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
