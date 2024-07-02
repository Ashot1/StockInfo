import { getCurrency } from '@/actions/Security/Currency'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Metadata } from 'next'
import DefaultListItem from '@/components/ui/Lists/DefaultList/DefaultListItem'
import { URLList } from '@/utils/config'

export const revalidate = 7200

export const metadata: Metadata = {
   title: 'Валюта',
   description: 'Список валюты от Центрального Банка РФ',
   robots: {
      index: true,
      follow: true,
      googleBot: { follow: true, index: true },
   },
   openGraph: {
      title: 'Валюта',
      description: 'Список валюты от Центрального Банка РФ',
      url: `${process.env.NEXT_PUBLIC_SITEURL}/currency`,
      images: '/Preview.png',
   },
   twitter: {
      title: 'Валюта',
      description: 'Список валюты от Центрального Банка РФ',
      images: '/Preview.png',
   },
}

export default function CurrencyPage() {
   return (
      <>
         <MainContent />
         <a
            href="https://www.cbr-xml-daily.ru/"
            className="w-full text-center opacity-25"
         >
            API для курсов ЦБ РФ
         </a>
      </>
   )
}

const MainContent = async () => {
   const { data, error } = await getCurrency()

   if (!data || error) return <ErrorMessage errMessage={error} />

   return (
      <div className="my-8 flex flex-1 grid-cols-1 flex-col gap-6 opacity-85">
         {Object.values(data.Valute).map((item, index) => {
            const Current = item.Value / item.Nominal
            const Prev = item.Previous / item.Nominal

            const percent = ((Current - Prev) / Prev) * 100

            const animIndex = index <= 15 ? index : 15

            return (
               <DefaultListItem
                  key={item.CharCode}
                  url={`${URLList.current_currency}/${item.CharCode}`}
                  text={item.Name}
                  subtext={item.CharCode}
                  rightText={Current.toFixed(4) + ' ₽'}
                  rightSubtext={parseFloat(percent.toFixed(3))}
                  img={`${URLList.logos_currency}/${item.CharCode}.png`}
                  defaultIMG="/Menu/Shortcuts/Currency.png"
                  className={`animate-appearance-moving opacity-0 transition-opacity fill-mode-forwards delay-${
                     100 * animIndex
                  }`}
               />
            )
         })}
      </div>
   )
}
