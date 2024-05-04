import { getCurrency } from '@/actions/Security(client)/Currency'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Metadata } from 'next'
import DefaultList, {
   DefaultListLoading,
} from '@/components/ui/DefaultList/DefaultList'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { URLList } from '@/utils/const'

export const revalidate = 7200

export const metadata: Metadata = {
   title: 'Валюта',
   description: 'Список валюты от Центрального Банка РФ',
   openGraph: {
      title: 'Валюта',
      description: 'Список валюты от Центрального Банка РФ',
   },
   twitter: {
      title: 'Валюта',
      description: 'Список валюты от Центрального Банка РФ',
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
         {Object.values(data.Valute).map((item) => {
            const Current = item.Value / item.Nominal
            const Prev = item.Previous / item.Nominal

            const percent = ((Current - Prev) / Prev) * 100

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
               />
            )
         })}
      </div>
   )
}
