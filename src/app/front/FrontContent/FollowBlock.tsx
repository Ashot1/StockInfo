import CustomContentBlock from '@/components/entity/Front/CustomContentBlock'
import SecurityFace from '@/components/ui/SecurityFace'
import { cn, getDataByType } from '@/utils/utils'
import { russoOne } from '@/utils/fonts'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import gradient from './assets/gradient.svg'

const FollowBlock: FC<{ id: string }> = async ({ id }) => {
   const Securities = [
      {
         name: 'ТКС Холдинг МКПАО ао',
         secID: 'TCSG',
      },
      {
         name: 'Сбербанк России ПАО ао',
         secID: 'SBER',
      },
   ]
   const { img: img1 } = getDataByType({
      imgSRC: Securities[0].secID,
      SECID: Securities[0].secID,
   })
   const percents = [2, 5, -7, 92, -25, 40, -63]

   return (
      <CustomContentBlock
         className="snap-selector min-h-screen snap-center snap-always px-[10%] 1080p:px-[20%]"
         gradient={gradient}
         id={id}
         text={{
            content: `Следите за актуальными котировками акций в реальном времени.
                  Наше приложение предоставляет вам мгновенный доступ к биржевой
                  информации, чтобы вы могли принимать обоснованные
                  инвестиционные решения.`,
            title: 'Будь в курсе рыночных тенденций',
         }}
      >
         <div className="rotateCard z-20 rounded-2xl border-2 border-primary/40 bg-primary/10 p-5 shadow-2xl shadow-white/10">
            <SecurityFace
               className="translateZFromCard"
               secID={Securities[0].secID}
               secCode={Securities[0].secID}
               secTitle={Securities[0].name}
               image={img1['Stock']}
               variant="vertical"
            />
         </div>
         <div
            className={cn(
               'rotateCard grid grid-cols-2 text-lg',
               russoOne.className
            )}
         >
            {percents.map((percent, index) => {
               const isPositive = percent > 0
               const text = isPositive ? `+${percent}%` : `${percent}%`

               const delay = 100 * index
               return (
                  <span
                     key={`${percent} ${index}`}
                     className={cn(
                        'flex animate-pulse items-center text-sm shadow-2xl duration-500 500p:text-base',
                        isPositive ? 'text-green-700' : 'text-red-900',
                        `delay-${delay}`
                     )}
                     style={{
                        transform: `translateZ(${
                           (percents.length - index) * 10
                        }px)`,
                     }}
                  >
                     {text}{' '}
                     {isPositive ? (
                        <ArrowUpIcon className="size-3.5 500p:size-5" />
                     ) : (
                        <ArrowDownIcon className="size-3.5 500p:size-5" />
                     )}
                  </span>
               )
            })}
         </div>
      </CustomContentBlock>
   )
}
export default FollowBlock
