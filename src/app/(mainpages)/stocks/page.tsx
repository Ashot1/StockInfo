import PageTitle from '@/components/ui/PageTitle'
import { getStocksList } from '@/actions/Stocks'
import { Suspense } from 'react'
import { PageStartCounter, URLList } from '@/utils/const'
import CustomPagination from '@/components/entity/CustomPagination'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { Metadata } from 'next'
import DefaultListItem from '@/components/ui/DefaultListItem'
import { comfortaa } from '@/utils/fonts'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultList from '@/components/ui/DefaultList'

export const metadata: Metadata = {
   title: 'Акции',
   description: 'Новости Московской Биржи (MOEX)',
}

export default async function StocksPage({
   searchParams,
}: {
   searchParams: { start?: string }
}) {
   const { data, error } = await getStocksList(
      searchParams?.start,
      PageStartCounter
   )

   if (!data || error) return <ErrorMessage errMessage={error} />

   const StocksList = data.history.columns

   const shortName = StocksList.indexOf('SHORTNAME')
   const secID = StocksList.indexOf('SECID')
   const marketPrice2 = StocksList.indexOf('MARKETPRICE2')
   const marketPrice3 = StocksList.indexOf('MARKETPRICE3')
   const closePrice = StocksList.indexOf('CLOSE')
   const maxSize = data['history.cursor'].columns.indexOf('TOTAL')
   let startIndex = parseInt(searchParams.start || '0')

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <PageTitle>Список акций</PageTitle>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={data['history.cursor'].data[0][maxSize]}
         />
         <DefaultList>
            {data.history.data.length <= 0 && (
               <div
                  className={`grid w-full flex-1 place-items-center ${comfortaa.className}`}
               >
                  Пусто
               </div>
            )}
            {data.history.data.map((stocks, index) => {
               let price =
                  stocks[marketPrice2] ||
                  stocks[marketPrice3] ||
                  stocks[closePrice]

               const differencePrices =
                  (price as number) - (stocks[closePrice] as number)

               const percent =
                  (differencePrices / (stocks[closePrice] as number)) * 100

               price = Intl.NumberFormat('ru', {
                  style: 'currency',
                  currency: 'RUB',
                  currencyDisplay: 'symbol',
               }).format((price as number) || 0)

               const animIndex = index <= 20 ? index : 20

               return (
                  <DefaultListItem
                     key={stocks[secID]}
                     img={`/Logos/${stocks[secID]}.svg`}
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
      </Suspense>
   )
}
