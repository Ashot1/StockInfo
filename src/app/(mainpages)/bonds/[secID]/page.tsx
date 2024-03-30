import { getCurrentStock } from '@/actions/Stocks'
import ControlPanel from '@/components/widgets/ControlPanel'
import TransformSecurityData from '@/utils/TransformSecurityData'
import { getCoupons } from '@/actions/Bonds'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { ConvertDate } from '@/utils/ConvertDate'
import { CouponsRequest } from '@/types/Bonds.types'
import SecurityTemplate from '@/components/module/SecurityTemplate'

export async function generateMetadata({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data, error } = await getCurrentStock(secID)

   const defaultMeta = {
      title: 'Облигация с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: 'Облигация с московской биржи',
         authors: 'Московская биржа',
      },
      twitter: {
         title: 'Облигация с московской биржи',
      },
   }

   if (!data || error) return defaultMeta

   const { valueIndex, nameIndex, titleIndex, title, code, StockInfoData } =
      TransformSecurityData(data, secID)

   if (!title || !code) return defaultMeta

   return {
      title: `${title[valueIndex]} - ${code[valueIndex]}`,
      description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
         description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
         authors: 'Московская биржа',
      },
      twitter: {
         title: `${title[valueIndex]} - ${code[valueIndex]}`,
         description: `Основная информация об ${title[valueIndex]} (${code[valueIndex]})`,
      },
   }
}

// PAGE
export default async function CurrentBond({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const { data: CouponsData, error: CouponsError } = await getCoupons(secID)

   const couponsContent = {
      name: 'Купоны',
      value: 'coupons',
      component:
         CouponsData && !CouponsError ? (
            <CouponsList CouponsData={CouponsData} />
         ) : (
            <EmptyListText text={CouponsError || 'Не найдено'} />
         ),
   }

   return (
      <div className="animate-appearance">
         <ControlPanel />
         <SecurityTemplate
            secID={secID}
            secondsContent={couponsContent}
            url={`/Logos/Bonds/${secID}.png`}
         />
      </div>
   )
}

// Another component
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
