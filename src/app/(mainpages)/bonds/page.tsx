import PageTitle from '@/components/ui/PageTitle'
import { getBondsList } from '@/actions/Bonds'
import { PageStartCounter, URLList } from '@/utils/const'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { Metadata } from 'next'
import SecurityListTemplate from '@/components/module/SecurityListTemplate'
import { searchBond } from '@/actions/CLIENT-CommonSecurity'

export const revalidate = 3600

export const metadata: Metadata = {
   title: 'Облигации',
   description: 'Список облигаций с Московской Биржи (MOEX)',
   openGraph: {
      title: 'Облигации',
      description: 'Список облигаций с Московской Биржи (MOEX)',
   },
   twitter: {
      title: 'Облигации',
      description: 'Список облигаций с Московской Биржи (MOEX)',
   },
}

export default async function BondsPage({
   searchParams: { start },
}: {
   searchParams: { start?: string }
}) {
   return (
      <>
         <PageTitle>Список облигаций</PageTitle>
         <MainContent start={start} />
      </>
   )
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data: BondsList, error } = await getBondsList(
      start,
      PageStartCounter
   )

   if (!BondsList || error) return <ErrorMessage errMessage={error} />

   const shortName = BondsList.history.columns.indexOf('SHORTNAME')
   const secID = BondsList.history.columns.indexOf('SECID')
   const marketPrice2 = BondsList.history.columns.indexOf('MARKETPRICE2')
   const marketPrice3 = BondsList.history.columns.indexOf('MARKETPRICE3')
   const closePrice = BondsList.history.columns.indexOf('CLOSE')
   const maxSize = BondsList['history.cursor'].columns.indexOf('TOTAL')
   const maxPageCounter = BondsList['history.cursor'].data[0][maxSize]
   let startIndex = parseInt(start || '0')

   return (
      <SecurityListTemplate
         imgURL={URLList.logos_bonds}
         imgType="png"
         searchRequest={searchBond}
         dataLength={BondsList.history.data.length}
         url={URLList.bonds}
         step={PageStartCounter}
         startIndex={startIndex}
         maxSize={maxPageCounter}
      >
         {BondsList.history.data.map((bonds, index) => {
            let price =
               bonds[marketPrice2] || bonds[marketPrice3] || bonds[closePrice]

            const differencePrices =
               (price as number) - (bonds[closePrice] as number)

            let percent =
               (differencePrices / (bonds[closePrice] as number)) * 100

            price = Intl.NumberFormat('ru', {
               style: 'currency',
               currency: 'RUB',
               currencyDisplay: 'symbol',
            }).format((price as number) || 0)

            const animIndex = index <= 15 ? index : 15

            percent = percent == Infinity ? 0 : percent

            return (
               <DefaultListItem
                  defaultSRC="/Menu/Shortcuts/Bond.png"
                  key={bonds[secID]}
                  img={`${URLList.logos_bonds}/${bonds[secID]}.png`}
                  subtext={`${bonds[secID]}`}
                  text={bonds[shortName] as string}
                  rightText={price}
                  rightSubtext={parseFloat(percent.toFixed(3))}
                  url={`${URLList.current_bond}/${bonds[secID]}`}
                  className={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * animIndex}`}
               />
            )
         })}
      </SecurityListTemplate>
   )
}
