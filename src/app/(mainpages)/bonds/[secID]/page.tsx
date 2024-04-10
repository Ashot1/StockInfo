import { getCurrentStock } from '@/actions/Stocks'
import { getCoupons } from '@/actions/Bonds'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import CustomTable from '@/components/entity/CustomElements/CustomTable'
import { ConvertDate } from '@/utils/ConvertDate'
import { CouponsRequest } from '@/types/Bonds.types'
import SecurityTemplate from '@/components/module/SecurityTemplate'
import { URLList } from '@/utils/const'

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

   const title = data[1].description.find((item) => item.name === 'SHORTNAME')
      ?.value
   const code = data[1].description.find((item) => item.name === 'SECID')?.value

   if (!title || !code) return defaultMeta

   return {
      title: `${title} - ${code}`,
      description: `Основная информация об ${title} (${code})`,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
         authors: 'Московская биржа',
      },
      twitter: {
         title: `${title} - ${code}`,
         description: `Основная информация об ${title} (${code})`,
      },
   }
}

// PAGE
export default async function CurrentBond({
   params: { secID },
}: {
   params: { secID: string }
}) {
   const bondReq = getCurrentStock(secID)
   const couponsReq = getCoupons(secID)

   const [bondRes, couponsRes] = await Promise.all([bondReq, couponsReq])

   const { data: CouponsData, error: CouponsError } = couponsRes
   const { data, error } = bondRes

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
         <SecurityTemplate
            type="Bond"
            data={data}
            error={error}
            secID={secID}
            secondsContent={couponsContent}
            url={`${URLList.logos_bonds}/${secID}.png`}
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

   const content = CouponsData[1].coupons.map((item) => [
      ConvertDate(`${item.startdate}'`, false),
      ConvertDate(`${item.coupondate}`, false),
      `${item.value_rub || 'Не известно'} RUB`,
      `${item.valueprc || 'Не известно'} %`,
   ])

   return (
      <div className="500p:px-[10%]">
         <CustomTable header={header} content={content} />
      </div>
   )
}
