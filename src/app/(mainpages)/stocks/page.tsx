import PageTitle from '@/components/ui/PageTitle'
import { getStocksList, searchStock } from '@/actions/Stocks'
import { PageStartCounter, URLList } from '@/utils/const'
import { Metadata } from 'next'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import SecurityListTemplate from '@/components/module/SecurityListTemplate'

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
   return (
      <>
         <PageTitle>Список акций</PageTitle>
         <MainContent start={searchParams?.start} />
      </>
   )
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data, error } = await getStocksList(start, PageStartCounter)

   if (!data || error) return <ErrorMessage errMessage={error} />

   const StocksList = data.history.columns

   const shortName = StocksList.indexOf('SHORTNAME')
   const secID = StocksList.indexOf('SECID')
   const marketPrice2 = StocksList.indexOf('MARKETPRICE2')
   const marketPrice3 = StocksList.indexOf('MARKETPRICE3')
   const closePrice = StocksList.indexOf('CLOSE')
   const maxSize = data['history.cursor'].columns.indexOf('TOTAL')
   const maxPageCounter = data['history.cursor'].data[0][maxSize]
   let startIndex = parseInt(start || '0')

   return (
      <SecurityListTemplate
         imgURL={URLList.logos_stock}
         imgType="svg"
         searchRequest={searchStock}
         maxSize={maxPageCounter}
         url={URLList.stocks}
         startIndex={startIndex}
         step={PageStartCounter}
         dataLength={data.history.data.length}
      >
         {data.history.data.map((stocks, index) => {
            let price =
               stocks[marketPrice2] ||
               stocks[marketPrice3] ||
               stocks[closePrice]

            const differencePrices =
               (price as number) - (stocks[closePrice] as number)

            let percent =
               (differencePrices / (stocks[closePrice] as number)) * 100

            price = Intl.NumberFormat('ru', {
               style: 'currency',
               currency: 'RUB',
               currencyDisplay: 'symbol',
            }).format((price as number) || 0)

            const animIndex = index <= 15 ? index : 15

            percent = percent == Infinity ? 0 : percent

            return (
               <DefaultListItem
                  key={stocks[secID]}
                  img={`${URLList.logos_stock}/${stocks[secID]}.svg`}
                  subtext={`${stocks[secID]}`}
                  text={stocks[shortName] as string}
                  rightText={price}
                  rightSubtext={parseFloat(percent.toFixed(3))}
                  url={`${URLList.current_stock}/${stocks[secID]}`}
                  className={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * animIndex}`}
               />
            )
         })}
      </SecurityListTemplate>
   )
}
