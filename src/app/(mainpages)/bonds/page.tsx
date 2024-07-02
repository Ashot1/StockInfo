import { getBondsList } from '@/actions/Security/Bonds'
import { PageStartCounter, URLList } from '@/utils/config'
import ErrorMessage from '@/components/ui/ErrorMessage'
import DefaultListItem from '@/components/ui/Lists/DefaultList/DefaultListItem'
import { Metadata } from 'next'
import SecurityListTemplate from '@/components/widgets/SecurityListTemplate'
import { convertMoney } from '@/utils/utils'

export const revalidate = 300

export const metadata: Metadata = {
   title: 'Облигации',
   description: 'Список облигаций с Московской Биржи (MOEX)',
   robots: {
      index: true,
      follow: true,
      googleBot: { follow: true, index: true },
   },
   openGraph: {
      title: 'Облигации',
      description: 'Список облигаций с Московской Биржи (MOEX)',
      url: `${process.env.NEXT_PUBLIC_SITEURL}/bonds`,
      images: '/Preview.png',
   },
   twitter: {
      title: 'Облигации',
      description: 'Список облигаций с Московской Биржи (MOEX)',
      images: '/Preview.png',
   },
}

export default async function BondsPage({
   searchParams: { start },
}: {
   searchParams: { start?: string }
}) {
   return <MainContent start={start} />
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data, error } = await getBondsList(start, PageStartCounter)

   if (!data || error) return <ErrorMessage errMessage={error} />

   const history = data[1].history
   const cursor = data[1]['history.cursor'][0]

   let startIndex = parseInt(start || '0')

   return (
      <SecurityListTemplate
         dataLength={history.length}
         url={URLList.bonds}
         step={PageStartCounter}
         startIndex={startIndex}
         maxSize={cursor.TOTAL}
      >
         {history.map((bond, index) => {
            let price: number | string =
               bond.MARKETPRICE2 || bond.MARKETPRICE3 || bond.CLOSE

            price = convertMoney(price || 0)

            const animIndex = index <= 15 ? index : 15

            return (
               <DefaultListItem
                  defaultIMG="/Menu/Shortcuts/Bond.png"
                  key={bond.SECID}
                  img={`${URLList.logos_bonds}/${bond.SECID}.png`}
                  subtext={`${bond.SECID}`}
                  text={bond.SHORTNAME}
                  rightText={price}
                  url={`${URLList.current_bond}/${bond.SECID}`}
                  className={`animate-appearance-moving opacity-0 transition-opacity fill-mode-forwards delay-${
                     100 * animIndex
                  }`}
               />
            )
         })}
      </SecurityListTemplate>
   )
}
