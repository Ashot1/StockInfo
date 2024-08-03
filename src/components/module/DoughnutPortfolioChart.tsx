'use client'

import { FC } from 'react'
import CustomCircleChart from '@/components/entity/CustomElements/CustomCircleChart'
import { useHomeContext } from '@/hoc/Providers/HomeProvider'
import { Chart, ChartData } from 'chart.js'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { useColorMany } from '@/hooks/Colors'
import { convertMoney, getDataByType } from '@/utils/utils'
import { useTheme } from 'next-themes'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { MobileScreen } from '@/utils/config'
import Loader from '@/components/ui/Loaders/loader'

const DoughnutPortfolioChart: FC = () => {
   const {
      Purchases,
      error: ContextError,
      loading: ContextLoading,
   } = useHomeContext()

   const { resolvedTheme } = useTheme()

   const isMobile = useMatchMedia(MobileScreen)

   const auth = useAuthContext().mainInfo
   const purchases = Purchases?.toSpliced(0, 0, {
      SHORTNAME: 'Российский рубль',
      type: 'Currency',
      SECID: 'RUB',
      price: 1,
      quantity: auth.current_money,
      image: `RUB`,
      average_buy_price: 0,
      last_buy_date: new Date('2023-01-01'),
      transaction_id: [''],
   })

   const images: string[] = []
   let summary = 0

   for (let purchase of purchases || []) {
      const { img } = getDataByType({
         imgSRC: purchase.image,
         SECID: purchase.SECID,
      })

      summary += (purchase.price || 0) * purchase.quantity

      images.push(img[purchase.type])
   }

   const { data: Colors, loading } = useColorMany({
      images: images,
      mode: 'rgb',
   })

   const height = `${(isMobile ? 300 : 100) + (purchases?.length || 5) * 30}px`

   if (ContextLoading || loading || !Colors || Colors?.length <= 0)
      return (
         <div style={{ height }} className="grid place-items-center">
            <Loader />
         </div>
      )
   if (ContextError || !purchases || !auth.transactions)
      return (
         <ErrorMessage
            errMessage={ContextError || 'Ошибка получения данных'}
            style={{ height }}
         />
      )

   const data: ChartData<'doughnut', number[], unknown> = {
      labels: purchases.map((p) => p.SHORTNAME),
      datasets: [
         {
            label: 'Сумма',
            backgroundColor: Colors.map(
               (color) => `rgb(${color[0]},${color[1]},${color[2]},0.7)`
            ),
            data: purchases.map((p) => (p.price || 0) * p.quantity),
            spacing: 5,
         },
      ],
   }

   const color =
      resolvedTheme === 'dark' ? 'rgb(255,255,255,0.9)' : 'rgb(0,0,0,0.9)'

   const SecondColor =
      resolvedTheme === 'dark' ? 'rgb(255,255,255,0.3)' : 'rgb(0,0,0,0.3)'

   const generateLabels = (chart: Chart) => {
      const datasets = chart.data.datasets
      return datasets[0].data.map((data, index) => ({
         text: `${chart.data.labels?.[index]}  —  ${convertMoney(
            data as number
         )}`,
         fillStyle: (datasets[0].backgroundColor as string[])?.[index],
         index,
         fontColor: color,
      }))
   }

   return (
      <div
         className="grid min-h-[20dvh] w-full place-items-center 300p:px-6 500p:px-[10%] 768p:px-0"
         style={{
            height: height,
            minHeight: height,
         }}
      >
         <CustomCircleChart
            aria-label="Диаграмма по состоянию счета"
            data={data}
            textCenter={{ mainText: convertMoney(summary), subText: 'Баланс' }}
            colors={{ main: color, second: SecondColor }}
            generateLabels={generateLabels}
            legendPosition={isMobile ? 'bottom' : 'right'}
         />
      </div>
   )
}

export default DoughnutPortfolioChart
