import { getStockMarketPrice, getStocksList } from '@/actions/Security/Stocks'
import { PageStartCounter, URLList } from '@/utils/config'
import { Metadata } from 'next'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultListItem from '@/components/ui/Lists/DefaultList/DefaultListItem'
import SecurityListTemplate from '@/components/widgets/SecurityListTemplate'
import { calculateDefinition, convertMoney } from '@/utils/utils'

export const revalidate = 300

export const metadata: Metadata = {
   title: 'Акции',
   description: 'Список акций с Московской Биржи (MOEX)',
   robots: {
      index: true,
      follow: true,
      googleBot: { follow: true, index: true },
   },
   openGraph: {
      title: 'Акции',
      description: 'Список акций с Московской Биржи (MOEX)',
      url: `${process.env.NEXT_PUBLIC_SITEURL}/stocks`,
      images: '/Preview.png',
   },
   twitter: {
      title: 'Акции',
      description: 'Список акций с Московской Биржи (MOEX)',
      images: '/Preview.png',
   },
}

export default async function StocksPage(
   props: {
      searchParams: Promise<{ start?: string }>
   }
) {
   const searchParams = await props.searchParams;
   return <MainContent start={searchParams?.start} />
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data, error } = await getStocksList(start, PageStartCounter)

   if (!data || error) return <ErrorMessage errMessage={error} />

   const StocksList = data[1].history
   const Cursor = data[1]['history.cursor'][0]

   let startIndex = parseInt(start || '0')

   return (
      <SecurityListTemplate
         maxSize={Cursor.TOTAL}
         url={URLList.stocks}
         startIndex={startIndex}
         step={PageStartCounter}
         dataLength={StocksList.length}
      >
         {StocksList.map((stock, index) => {
            let price: number | string =
               stock.MARKETPRICE2 || stock.MARKETPRICE3 || stock.CLOSE

            price = convertMoney(price || 0)

            const animIndex = index <= 15 ? index : 15

            return (
               <DefaultListItem
                  defaultIMG="/Menu/Shortcuts/Stock.png"
                  key={stock.SECID}
                  img={`${URLList.logos_stock}/${stock.SECID}.svg`}
                  subtext={`${stock.SECID}`}
                  text={stock.SHORTNAME as string}
                  rightText={price}
                  url={`${URLList.current_stock}/${stock.SECID}`}
                  className={`animate-appearance-moving opacity-0 transition-opacity fill-mode-forwards delay-${
                     100 * animIndex
                  }`}
               />
            )
         })}
      </SecurityListTemplate>
   )
}
