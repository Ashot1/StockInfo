import { cn } from '@/utils/utils'
import classes from '../assets/FrontPage.module.css'
import FrontTitle from '@/components/ui/Front/FrontTitle'
import Image from 'next/image'
import gradient from '../assets/gradient.svg'
import FrontText from '@/components/ui/Front/FrontText'

export default async function ThirdBlock({
   className,
   id,
}: {
   className?: string
   id: string
}) {
   return (
      <div className={cn(`grid place-items-center`, className)} id={id}>
         <div
            className={cn(
               `relative h-[80dvh] w-full 768p:h-[60%]`,
               classes.image_bg
            )}
         >
            <section className="grid h-full w-full grid-cols-1 place-items-center bg-[#121212]/50 px-[10%] 768p:grid-cols-2 768p:bg-[#121212]/80 1080p:px-[20%]">
               <FrontTitle className="z-20 px-4 py-2">
                  Будь в курсе событий
               </FrontTitle>
               <FrontText>
                  Получайте последние новости в реальном времени. Наше
                  приложение поможет вам всегда быть информированным о важнейших
                  рыночных событиях. Учитесь анализировать рынок и принимайте
                  обоснованные решения.
               </FrontText>
               <span className="absolute z-10 768p:right-4">
                  <Image src={gradient} alt="gradient" />
               </span>
            </section>
         </div>
      </div>
   )
}
