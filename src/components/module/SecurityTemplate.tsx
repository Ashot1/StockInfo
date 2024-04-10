import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import CustomTabs, {
   TabsContentType,
} from '@/components/entity/CustomElements/CustomTabs'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import { CurrentStockRequest } from '@/types/Stocks.types'
import { Enums } from '@/types/supabase.types'

export default async function SecurityTemplate({
   secID,
   secondsContent,
   url,
   data,
   error,
   type,
}: {
   secID: string
   secondsContent: TabsContentType
   url: string
   data?: CurrentStockRequest
   error?: string
   type: Enums<'favorite_types'>
}) {
   if (!data || error) return redirect(URLList.notFound)

   const description = data[1].description

   const secCode =
      description.find((item) => item.name === 'SECID')?.value || ''
   const secTitle =
      description.find((item) => item.name === 'NAME')?.value || ''

   const Info = [
      {
         name: 'Основная информация',
         value: 'mainInfo',
         component: <SecurityInfoList currencyList={description} />,
      },
      secondsContent,
   ]

   return (
      <>
         <SecurityMainInfo
            type={type}
            secCode={secCode}
            secTitle={secTitle}
            secID={secID}
            img={url}
         />
         <CustomTabs content={Info} />
      </>
   )
}
