import PageTitle from '@/components/ui/PageTitle'
import { getStocksList } from '@/actions/Stocks'
import { Suspense } from 'react'
import { PageStartCounter, URLList } from '@/utils/const'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { Metadata } from 'next'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultList from '@/components/ui/DefaultList/DefaultList'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import CustomPagination from '@/components/entity/CustomElements/CustomPagination'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'

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
         <Suspense fallback={<CenterScreenLoader />}>
            <MainContent start={searchParams?.start} />
         </Suspense>
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
      <>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={maxPageCounter}
         />
         <DefaultList
            CurrentStartIndex={startIndex}
            Step={PageStartCounter}
            url={URLList.stocks}
            maxLength={maxPageCounter}
         >
            {data.history.data.length <= 0 && <EmptyListText text="Пусто" />}

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

               const animIndex = index <= 20 ? index : 20

               percent = percent == Infinity ? 0 : percent

               return (
                  <DefaultListItem
                     key={stocks[secID]}
                     img={`/Logos/Stocks/${stocks[secID]}.svg`}
                     subtext={`${stocks[secID]}`}
                     text={stocks[shortName] as string}
                     rightText={price}
                     rightSubtext={parseFloat(percent.toFixed(3))}
                     url={`${URLList.stocks}/${stocks[secID]}`}
                     className={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * animIndex}`}
                  />
               )
            })}
         </DefaultList>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={data['history.cursor'].data[0][maxSize]}
         />
      </>
   )
}
