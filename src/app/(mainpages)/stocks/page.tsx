import { getStocksList } from '@/actions/Stocks'
import { PageStartCounter, URLList } from '@/utils/const'
import { Metadata } from 'next'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import SecurityListTemplate from '@/components/module/SecurityListTemplate'

export const revalidate = 3600

export const metadata: Metadata = {
   title: 'Акции',
   description: 'Список акций с Московской Биржи (MOEX)',
   openGraph: {
      title: 'Акции',
      description: 'Список акций с Московской Биржи (MOEX)',
   },
   twitter: {
      title: 'Акции',
      description: 'Список акций с Московской Биржи (MOEX)',
   },
}

export default async function StocksPage({
   searchParams,
}: {
   searchParams: { start?: string }
}) {
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
            let price: number | string = stock.CLOSE

            const differencePrices =
               ((price - stock.OPEN) / ((stock.OPEN + price) / 2)) * 100

            let percent = (differencePrices / price) * 100

            price = Intl.NumberFormat('ru', {
               style: 'currency',
               currency: 'RUB',
               currencyDisplay: 'symbol',
            }).format(price || 0)

            const animIndex = index <= 15 ? index : 15

            percent = percent == Infinity ? 0 : percent

            return (
               <DefaultListItem
                  defaultSRC="/Menu/Shortcuts/Stock.png"
                  key={stock.SECID}
                  img={`${URLList.logos_stock}/${stock.SECID}.svg`}
                  subtext={`${stock.SECID}`}
                  text={stock.SHORTNAME as string}
                  rightText={price}
                  rightSubtext={parseFloat(percent.toFixed(3))}
                  url={`${URLList.current_stock}/${stock.SECID}`}
                  className={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * animIndex}`}
               />
            )
         })}
      </SecurityListTemplate>
   )
}
