'use client'

import { FC } from 'react'
import { ChartProps, Doughnut } from 'react-chartjs-2'
import {
   ArcElement,
   Chart as ChartJS,
   Chart,
   ChartData,
   ChartOptions,
   Legend,
   LegendItem,
   Plugin,
   Tooltip,
} from 'chart.js'
import { cn } from '@/utils/utils'

ChartJS.register(ArcElement, Tooltip, Legend)

export type CustomCircleChartProps = Omit<
   ChartProps<'doughnut'>,
   'type' | 'options' | 'plugins'
> & {
   data: ChartData<'doughnut', number[], unknown>
   colors: { main: string; second: string }
   className?: string
   textCenter?: { mainText: string; subText?: string }
   generateLabels?: (chart: Chart) => LegendItem[]
   legendPosition?: 'bottom' | 'right'
}

const CustomCircleChart: FC<CustomCircleChartProps> = ({
   data,
   className,
   textCenter,
   generateLabels,
   legendPosition = 'bottom',
   colors: { main, second },
   ...props
}) => {
   const options: ChartOptions<'doughnut'> = {
      maintainAspectRatio: false,
      borderColor: 'transparent',
      plugins: {
         legend: {
            position: legendPosition,
            labels: {
               generateLabels: generateLabels,
               font: { size: 15 },
               boxWidth: 4,
               boxHeight: 24,
            },
            align: 'center',
         },
      },
      cutout: '97%',
   }

   const textCenterPainter: Plugin<'doughnut'> = {
      id: 'textCenterPainter',
      beforeDraw(chart: Chart<'doughnut'>) {
         if (!textCenter) return
         const { ctx } = chart

         const { top, height, left, width } = chart.chartArea

         ctx.fillStyle = main
         ctx.font = `24px serif`
         ctx.textAlign = 'center'
         ctx.fillText(textCenter.mainText, width / 2, top + height / 2)
         ctx.restore()

         if (!textCenter.subText) return

         const metrics = ctx.measureText(textCenter.mainText)
         const ySpace =
            metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

         ctx.fillStyle = second
         ctx.font = `18px serif`
         ctx.textAlign = 'center'
         ctx.fillText(textCenter.subText, width / 2, top + height / 2 - ySpace)
      },
   }

   const shadowPlugin: Plugin<'doughnut'> = {
      id: 'shadow',
      beforeDraw: (chart: Chart<'doughnut'>) => {
         const { ctx } = chart
         const _fill = ctx.fill
         ctx.fill = function () {
            ctx.save()
            ctx.shadowColor = ctx.fillStyle as string
            ctx.shadowBlur = 10
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            _fill.apply(this, arguments as any)
            ctx.restore()
         }
      },
   }

   const doughnutBackground: Plugin<'doughnut'> = {
      id: 'doughnutBackground',
      beforeDraw(chart: Chart<'doughnut'>) {
         const { ctx } = chart

         const { top, height, left, width } = chart.chartArea

         ctx.fillStyle = 'rgb(0,0,0,0.5)'
         ctx.arc(
            (left + width) / 2,
            (top + height) / 2,
            height / 2,
            0,
            2 * Math.PI
         )
         ctx.fill()
      },
   }

   return (
      <Doughnut
         data={data}
         options={options}
         className={cn(className)}
         plugins={[shadowPlugin, textCenterPainter]}
         {...props}
      />
   )
}

export default CustomCircleChart
