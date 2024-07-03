import { cn } from '@/utils/utils'
import Phone from '@/components/ui/Phone'
import Image, { StaticImageData } from 'next/image'
import FrontTitle from '@/components/ui/Front/FrontTitle'
import { comfortaa } from '@/utils/fonts'

export default async function PhoneBlock({
   className,
   id,
   revert = false,
   gradient,
   gif,
   text,
}: {
   className?: string
   id: string
   revert?: boolean
   gradient: string
   gif: StaticImageData
   text: { title: string; content: string }
}) {
   return (
      <div
         className={cn('relative grid place-items-center', className)}
         id={id}
      >
         <section
            aria-label="Блок с информацией"
            className={cn(
               'grid w-full grid-cols-1 items-center gap-5 500p:grid-cols-2',
               revert
                  ? '1024p:grid-cols-[1fr_0.7fr]'
                  : '1024p:grid-cols-[0.7fr_1fr]'
            )}
         >
            <div className={cn('flex flex-col gap-2.5', revert && 'order-2')}>
               <FrontTitle>{text.title}</FrontTitle>
               <p
                  aria-label="Описание"
                  className={cn(
                     'text-pretty text-center text-sm fill-mode-forwards 1024p:text-base',
                     comfortaa.className
                  )}
               >
                  {text.content}
               </p>
            </div>
            <div
               className={cn(
                  'relative m-auto w-[70%] 300p:w-[65%] 768p:m-0 1024p:w-[40%]',
                  revert
                     ? 'order-1 768p:justify-self-start'
                     : '768p:justify-self-end'
               )}
            >
               <span
                  className="absolute -z-20 w-dvw -translate-x-1/4 -translate-y-1/4"
                  aria-hidden={true}
               >
                  <Image src={gradient} alt="gradient" />
               </span>
               <Phone className="flex w-full overflow-hidden bg-neutral-950 p-2">
                  <Image
                     aria-label="Видео представление"
                     src={gif}
                     alt="Покупка акции"
                     className="rounded-2xl"
                  />
               </Phone>
            </div>
         </section>
      </div>
   )
}
