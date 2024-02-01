import PageTitle from '@/components/ui/PageTitle'
import { getStocksList } from '@/actions/Stocks'
import { Suspense } from 'react'
import { PageStartCounter } from '@/utils/const'
import CustomPagination from '@/components/entity/CustomPagination'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'

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
            <div className="w-full h-full grid place-items-center">
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
            {StocksList.history.data.map((stocks) => (
                <p key={stocks[secID]}>
                    {stocks[secID]} - {stocks[shortName]} -
                    {stocks[marketPrice3]}
                </p>
            ))}
            <CustomPagination
                currentStart={startIndex}
                element={'main'}
                maxSize={StocksList['history.cursor'].data[0][maxSize]}
            />
        </Suspense>
    )
}
