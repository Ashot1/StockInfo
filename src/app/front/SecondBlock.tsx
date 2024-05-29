'use client'

import { FC } from 'react'
import { cn, getDataByType } from '@/utils/utils'
import SecurityFace from '@/components/ui/SecurityFace'
import { motion } from 'framer-motion'
import { comfortaa } from '@/utils/fonts'
import Image from 'next/image'
import gradient from './gradient.svg'
import FrontTitle from '@/components/ui/FrontTitle'

const SecondBlock: FC<{ className?: string }> = ({ className }) => {
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
         className={cn(
            'grid h-full place-items-center px-[10%] 1080p:px-[20%]',
            className
         )}
         id="secondBlock"
      >
         <section className="grid grid-cols-1 gap-16 768p:grid-cols-2">
            <LeftSection />
            <RightSection Securities={Securities} />
         </section>
      </div>
   )
}

export default SecondBlock

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
   const { img: img2 } = getDataByType({
      imgSRC: Securities[1].secID,
      SECID: Securities[1].secID,
   })

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

   return (
      <div className="relative flex justify-self-center 768p:justify-self-end">
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
      </div>
   )
}

const LeftSection = () => {
   return (
      <div className="relative grid grid-cols-1 gap-4">
         <span className="absolute -top-64 500p:-top-60 768p:-left-[60dvw] 768p:-top-32">
            <Image src={gradient} alt="gradient" />
         </span>
         <FrontTitle>Будь всегда в курсе рыночных тенденций</FrontTitle>
         <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={cn(
               'text-pretty text-center text-sm 768p:text-start 1024p:text-base',
               comfortaa.className
            )}
         >
            Следите за актуальными котировками акций в реальном времени. Наше
            приложение предоставляет вам мгновенный доступ к биржевой
            информации, чтобы вы могли принимать обоснованные инвестиционные
            решения.
         </motion.p>
      </div>
   )
}
