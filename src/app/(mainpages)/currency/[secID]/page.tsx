import SecurityTemplate from '@/components/module/SecurityTemplate'
import { URLList } from '@/utils/const'
import { CurrentStockDescription } from '@/types/Stocks.types'
import { getCurrency } from '@/actions/Security/Currency'
import { redirect } from 'next/navigation'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrency()

   const defaultMeta = {
      title: 'Валюта',
      authors: { name: 'Центральный Банк РФ', url: 'https://cbr.ru' },
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title: 'Валюта',
         authors: 'Центральный Банк РФ',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/currency/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: 'Валюта',
         images: '/Preview.png',
      },
   }

   if (!data || error) return defaultMeta

   const title = data.Valute[secID].Name
   const code = data.Valute[secID].CharCode

   if (!title || !code) return defaultMeta

   return {
      title: `${title} - ${code}`,
      description: `Основная информация об ${title} (${code})`,
      authors: { name: 'Центральный Банк РФ', url: 'https://cbr.ru' },
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         authors: 'Центральный Банк РФ',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/currency/${secID}`,
         images: '/Preview.png',
      },
      twitter: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         images: '/Preview.png',
      },
   }
}

// PAGE
export default async function CurrentCurrencyPage({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data: CurrencyData, error } = await getCurrency()

   if (!CurrencyData || error) return redirect(URLList.notFound)

   const Currency = CurrencyData.Valute[secID]

   const data: [
      { charsetinfo: { name: string } },
      { description: CurrentStockDescription[] },
   ] = [
      { charsetinfo: { name: 'utf-8' } },
      {
         description: [
            {
               name: 'name',
               value: Currency.Name,
               type: '',
               title: 'Название',
               is_hidden: 0,
               precision: null,
               sort_order: 0,
            },
            {
               name: 'code',
               value: Currency.CharCode,
               type: '',
               title: 'Код ценной бумаги',
               is_hidden: 0,
               precision: null,
               sort_order: 0,
            },
            {
               name: 'id',
               value: Currency.ID,
               type: '',
               title: 'Идентификатор',
               is_hidden: 0,
               precision: null,
               sort_order: 0,
            },
         ],
      },
   ]

   const Current = (Currency.Value / Currency.Nominal).toFixed(3)
   const Prev = (Currency.Previous / Currency.Nominal).toFixed(3)

   return (
      <SecurityTemplate
         type="Currency"
         secID={secID}
         image={`${URLList.logos_currency}/${secID}.png`}
         data={data}
         MarketData={{ last: parseFloat(Current), prev: parseFloat(Prev) }}
         code={Currency.CharCode}
         title={Currency.Name}
      />
   )
}
