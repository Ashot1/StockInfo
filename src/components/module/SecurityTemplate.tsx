import { getCurrentStock } from '@/actions/Stocks'
import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'
import TransformSecurityData from '@/utils/TransformSecurityData'
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
   if (!data || error || !data.description.data.length)
      return redirect(URLList.notFound)

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return

   const Info = [
      {
         name: 'Основная информация',
         value: 'mainInfo',
         component: (
            <SecurityInfoList
               currencyList={StockInfoData}
               titleIndex={titleIndex}
               valueIndex={valueIndex}
               nameIndex={nameIndex}
            />
         ),
      },
      secondsContent,
   ]

   return (
      <>
         <SecurityMainInfo
            type={type}
            secCode={code[valueIndex] as string}
            secTitle={title[valueIndex] as string}
            secID={secID}
            img={url}
         />
         <CustomTabs content={Info} />
      </>
   )
}
