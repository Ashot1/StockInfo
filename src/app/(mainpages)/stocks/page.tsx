import PageTitle from '@/components/ui/PageTitle'
import { getStocksList } from '@/actions/Stocks'
import { Suspense } from 'react'
import { PageStartCounter } from '@/utils/const'
import CustomPagination from '@/components/entity/CustomPagination'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { Metadata } from 'next'
import DefaultListItem from '@/components/ui/DefaultListItem'
import { comfortaa } from '@/utils/fonts'

export const metadata: Metadata = {
   title: 'Акции',
   description: 'Новости Московской Биржи (MOEX)',
}

export default async function StocksPage({
   searchParams,
}: {
   searchParams: { start?: string }
}) {
   const { data: StocksList, error } = await getStocksList(
      searchParams?.start || '0',
      PageStartCounter
   )

   // TODO: сделать нормальное отображение
   if (!StocksList || error)
      return (
         <div className="grid h-full w-full place-items-center">
            Произошла ошибка <br /> {error}
         </div>
      )
   const shortName = StocksList.history.columns.indexOf('SHORTNAME')
   const secID = StocksList.history.columns.indexOf('SECID')
   const marketPrice2 = StocksList.history.columns.indexOf('MARKETPRICE2')
   const marketPrice3 = StocksList.history.columns.indexOf('MARKETPRICE3')
   const closePrice = StocksList.history.columns.indexOf('CLOSE')
   const maxSize = StocksList['history.cursor'].columns.indexOf('TOTAL')
   let startIndex = parseInt(searchParams.start || '0')

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <PageTitle>Список акций</PageTitle>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={StocksList['history.cursor'].data[0][maxSize]}
         />
         <section className={'my-8 flex flex-1 grid-cols-1 flex-col gap-6'}>
            {StocksList.history.data.length <= 0 && (
               <div
                  className={`grid w-full flex-1 place-items-center ${comfortaa.className}`}
               >
                  Пусто
               </div>
            )}
            {StocksList.history.data.map((stocks, index) => {
               let price =
                  stocks[marketPrice2] ||
                  stocks[marketPrice3] ||
                  stocks[closePrice]

               if (!price) return

               const differencePrices =
                  (price as number) - (stocks[closePrice] as number)

               const percent =
                  (differencePrices / (stocks[closePrice] as number)) * 100

               price = Intl.NumberFormat('ru', {
                  style: 'currency',
                  currency: 'RUB',
                  currencyDisplay: 'symbol',
               }).format(price as number)

               return (
                  <DefaultListItem
                     key={stocks[secID]}
                     img={`/Logos/${stocks[secID]}.svg`}
                     subtext={`${stocks[secID]}`}
                     text={stocks[shortName] as string}
                     rightText={price}
                     rightSubtext={parseFloat(percent.toFixed(3))}
                     url={`/stocks/${stocks[secID]}`}
                     className={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * index}`}
                  />
               )
            })}
         </section>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={StocksList['history.cursor'].data[0][maxSize]}
         />
      </Suspense>
   )
}
