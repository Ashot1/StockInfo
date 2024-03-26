import { getCurrentStock, getDividends } from '@/actions/Stocks'
import { URLList } from '@/utils/const'
import { redirect } from 'next/navigation'
import TransformSecurityData from '@/utils/TransformSecurityData'
import SecurityInfoList from '@/components/entity/SecurityInfoList'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import CustomTabs from '@/components/entity/CustomElements/CustomTabs'
import SecurityMainInfo from '@/components/widgets/SecurityMainInfo'
import { ConvertDate } from '@/utils/ConvertDate'
import { getCoupons } from '@/actions/Bonds'
import { CouponsRequest } from '@/types/Bonds.types'

export default async function BondsContent({ secID }: { secID: string }) {
   const { data, error } = await getCurrentStock(secID)

   const { data: CouponsData, error: CouponsError } = await getCoupons(secID)

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
      {
         name: 'Купоны',
         value: 'coupons',
         component:
            CouponsData && !CouponsError ? (
               <CouponsList CouponsData={CouponsData} />
            ) : (
               <EmptyListText text={CouponsError || 'Не найдено'} />
            ),
      },
   ]

   return (
      <>
         <SecurityMainInfo
            secCode={code[valueIndex] as string}
            secTitle={title[valueIndex] as string}
            secID={secID}
            prevLink={URLList.stocks}
            img={`/Logos/Bonds/${secID}.png`}
         />
         <CustomTabs content={Info} />
      </>
   )
}

const CouponsList = ({ CouponsData }: { CouponsData: CouponsRequest }) => {
   const header = [
      { text: 'Начало купонного периода' },
      { text: 'Дата выплаты' },
      { text: 'Купон' },
      { text: 'Ставка' },
   ]

   const columns = CouponsData.coupons.columns
   const startDate = columns.indexOf('startdate')
   const payDate = columns.indexOf('coupondate')
   const rub = columns.indexOf('value_rub')
   const percents = columns.indexOf('valueprc')

   const content = CouponsData.coupons.data.map((item) => [
      ConvertDate(`${item[startDate]}'`, false),
      ConvertDate(`${item[payDate]}`, false),
      `${item[rub] || 'Не известно'} RUB`,
      `${item[percents] || 'Не известно'} %`,
   ])

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
