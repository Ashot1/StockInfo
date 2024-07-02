import {
   getBondMarketPrice,
   getBondPriceHistory,
   getCoupons,
} from '@/actions/Security/Bonds'
import EmptyListText from '@/components/ui/Lists/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { ConvertDate } from '@/utils/Date'
import { CouponsRequest } from '@/types/Bonds.types'
import SecurityTemplate from '@/components/widgets/SecurityTemplate'
import { URLList } from '@/utils/config'
import { getCurrentSecurity } from '@/actions/Security/CommonSecurity'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentSecurity(secID)

   const defaultMeta = {
      title: 'Облигация с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title: 'Облигация с московской биржи',
         authors: 'Московская биржа',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/bonds/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: 'Облигация с московской биржи',
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
         url: `${process.env.NEXT_PUBLIC_SITEURL}/bonds/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         images: '/Preview.png',
      },
   }
}

// PAGE
export default async function CurrentBond({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const bondReq = getCurrentSecurity(secID)
   const couponsReq = getCoupons(secID)

   const date = new Date()
   date.setMonth(date.getMonth() - 1)

   const priceListReq = getBondPriceHistory({
      stock: secID,
      from: date.toISOString().substring(0, 10),
   })

   const MarketDataReq = getBondMarketPrice([secID])

   const [bondRes, couponsRes, priceListRes, MarketDataRes] = await Promise.all(
      [bondReq, couponsReq, priceListReq, MarketDataReq]
   )

   const { data, error } = bondRes
   const { data: CouponsData, error: CouponsError } = couponsRes
   const { data: PriceList } = priceListRes
   const { data: MarketData } = MarketDataRes

   const couponsContent = {
      name: 'Купоны',
      value: 'coupons',
      component:
         CouponsData && !CouponsError ? (
            <CouponsList CouponsData={CouponsData} />
         ) : (
            <EmptyListText text={CouponsError || 'Не найдено'} />
         ),
   }

   const MarketDataContent =
      MarketData &&
      MarketData[1].marketdata.find((item) => item.SECID === secID)

   const priceListCondition = PriceList && PriceList[1].candles.length > 0

   return (
      <div className="animate-appearance">
         <SecurityTemplate
            type="Bond"
            data={data}
            error={error}
            secID={secID}
            secondsContent={couponsContent}
            image={`${URLList.logos_bonds}/${secID}.png`}
            priceList={priceListCondition ? PriceList[1].candles : undefined}
            MarketData={{
               last: MarketDataContent?.MARKETPRICE || MarketDataContent?.LAST,
               high: MarketDataContent?.HIGH,
               low: MarketDataContent?.LOW,
               open: MarketDataContent?.OPEN,
            }}
         />
      </div>
   )
}

// Another component
const CouponsList = ({ CouponsData }: { CouponsData: CouponsRequest }) => {
   const header = [
      { text: 'Начало купонного периода' },
      { text: 'Дата выплаты' },
      { text: 'Купон' },
      { text: 'Ставка' },
   ]

   const content = CouponsData[1].coupons.map((item) => [
      ConvertDate(`${item.startdate}'`, false),
      ConvertDate(`${item.coupondate}`, false),
      `${item.value_rub || 'Не известно'} RUB`,
      `${item.valueprc || 'Не известно'} %`,
   ])

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
