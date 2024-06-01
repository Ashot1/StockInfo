import { FC } from 'react'
import { cn, getDataByType } from '@/utils/utils'
import SecurityFace from '@/components/ui/SecurityFace'
import { comfortaa, russoOne } from '@/utils/fonts'
import Image from 'next/image'
import gradient from '../assets/gradient.svg'
import FrontTitle from '@/components/ui/Front/FrontTitle'
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'

export default async function SecondBlock({
   className,
   id,
}: {
   className?: string
   id: string
}) {
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

   return (
      <div
         className={cn('relative grid place-items-center', className)}
         id={id}
      >
         <section className="grid grid-cols-1 place-items-center gap-16 768p:grid-cols-2">
            <LeftSection />
            <RightSection Securities={Securities} />
         </section>
         <span className="absolute -top-[10%] -z-20 500p:-top-60 768p:-left-[60dvw] 768p:bottom-32 1024p:-left-[30%] 4k:left-[10%] 4k:top-0">
            <Image src={gradient} alt="gradient" />
         </span>
      </div>
   )
}

const RightSection: FC<{
   Securities: {
      name: string
      secID: string
   }[]
}> = ({ Securities }) => {
   // const [SecIndex, setSecIndex] = useState(0)
   // const [IsVisible, setIsVisible] = useState(false)
   //
   const { img: img1 } = getDataByType({
      imgSRC: Securities[0].secID,
      SECID: Securities[0].secID,
   })
   // const { img: img2 } = getDataByType({
   //    imgSRC: Securities[1].secID,
   //    SECID: Securities[1].secID,
   // })

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       setIsVisible(false)
   //
   //       setTimeout(() => {
   //          setSecIndex((prev) =>
   //             prev + 1 >= Securities.length ? 0 : prev + 1
   //          )
   //       }, 1000)
   //
   //       setIsVisible(true)
   //    }, 1500)
   //
   //    return () => clearInterval(interval)
   // }, [])

   // const CurrentSecurity = {
   //    img: img['Stock'],
   //    name: Securities[SecIndex].name,
   //    secID: Securities[SecIndex].secID,
   // }

   const percents = [2, 5, -7, 92, -25, 40, -63]

   return (
      <div className="relative flex flex-col items-center justify-self-center 500p:flex-row 768p:justify-self-end">
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
            {/*<SmoothAppearanceWords*/}
            {/*   words={percents.map((percent) =>*/}
            {/*      percent > 0 ? `+${percent}%` : `${percent}%`*/}
            {/*   )}*/}
            {/*/>*/}
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
      </div>
   )
}

const LeftSection = () => {
   return (
      <div className="relative grid animate-appearance grid-cols-1 gap-4">
         <FrontTitle>Будь в курсе рыночных тенденций</FrontTitle>
         <p
            className={cn(
               'text-pretty text-center text-sm fill-mode-forwards 768p:text-start 1024p:text-base',
               comfortaa.className
            )}
         >
            Следите за актуальными котировками акций в реальном времени. Наше
            приложение предоставляет вам мгновенный доступ к биржевой
            информации, чтобы вы могли принимать обоснованные инвестиционные
            решения.
         </p>
      </div>
   )
}
