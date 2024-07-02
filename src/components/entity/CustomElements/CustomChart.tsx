'use client'

import { cn } from '@/utils/utils'
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   ChartData,
   Point,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { usePalette } from '@/hooks/Colors'

ChartJS.register(
   ArcElement,
   Tooltip,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Filler
)

export type CustomChartProps = {
   className?: string
   img?: string
   data: ChartData<'line', (number | Point | null)[], unknown>
}

export default function CustomChart({
   className,
   img,
   data,
}: CustomChartProps) {
   const { data: IMGdata, error } = usePalette({
      image: img || '/StockPlaceHolder.png',
      mode: 'rgb',
      quality: 5,
   })

   return (
      <div
         className={cn(
            'h-[32dvh] w-full rounded-2xl py-3 pl-2',
            !img && 'dark:invert',
            className
         )}
         style={{
            background:
               error || !IMGdata
                  ? 'transparent'
                  : `rgb(${IMGdata[1][0]}, ${IMGdata[1][1]}, ${IMGdata[1][2]}, .1)`,
         }}
      >
         <Line
            data={data}
            options={{
               elements: {
                  point: {
                     pointStyle: 'circle',
                     borderColor: 'transparent',
                     backgroundColor: 'transparent',
                     hoverBackgroundColor: 'black',
                  },
                  line: {
                     fill: true,
                     borderColor:
                        error || !IMGdata
                           ? 'var(--Main)'
                           : `rgb(${IMGdata[0][0]},${IMGdata[0][1]},${IMGdata[0][2]})`,
                     backgroundColor:
                        error || !IMGdata
                           ? 'var(--Main)'
                           : `rgb(${IMGdata[0][0]},${IMGdata[0][1]},${IMGdata[0][2]},.2)`,
                  },
               },
               maintainAspectRatio: false,
               plugins: {
                  tooltip: { multiKeyBackground: 'transparent' },
                  legend: { display: false },
               },
               interaction: { intersect: false },
               scales: {
                  y: {
                     grid: {
                        display: false,
                     },
                  },
                  x: {
                     display: false,
                  },
               },
            }}
         />
      </div>
   )
}
