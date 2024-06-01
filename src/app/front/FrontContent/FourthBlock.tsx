import { cn } from '@/utils/utils'
import Phone from '@/components/ui/Phone'
import BuyGif from '../assets/BUY-ezgif.com-video-to-gif-converter.gif'
import Image from 'next/image'
import gradient from '../assets/gradient.svg'
import FrontTitle from '@/components/ui/Front/FrontTitle'
import { comfortaa } from '@/utils/fonts'

export default async function FourthBlock({
   className,
   id,
}: {
   className?: string
   id: string
}) {
   return (
      <div
         className={cn('relative grid place-items-center', className)}
         id={id}
      >
         <span className="absolute bottom-[12%] right-0 -z-20 w-dvw 500p:-right-40 768p:-bottom-[10%] 768p:w-4/5 1024p:-right-[20%] 4k:-right-[27%] 4k:bottom-[10%]">
            <Image src={gradient} alt="gradient" />
         </span>
         <section className="grid w-full grid-cols-1 items-center gap-5 500p:grid-cols-2 1024p:grid-cols-[0.7fr_1fr]">
            <div className="flex flex-col gap-2.5">
               <FrontTitle>Инвестируй легко и уверенно</FrontTitle>
               <p
                  className={cn(
                     'text-pretty text-center text-sm fill-mode-forwards 1024p:text-base',
                     comfortaa.className
                  )}
               >
                  Покупай и продавай ценные бумаги виртуальными деньгами и учись
                  принимать правильные финансовые решения. Идеальный способ
                  начать свой путь в мире инвестиций без риска.
               </p>
            </div>
            <Phone className="m-auto flex w-[70%] overflow-hidden bg-neutral-950 p-2 300p:w-[65%] 768p:m-0 768p:justify-self-end 1024p:w-[40%]">
               <Image
                  src={BuyGif}
                  alt="Покупка акции"
                  className="rounded-2xl"
               />
            </Phone>
         </section>
      </div>
   )
}
