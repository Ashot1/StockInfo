import { cn } from '@/utils/utils'
import classes from './ImageBlock.module.css'
import FrontTitle from '@/components/ui/Front/FrontTitle'
import Image from 'next/image'
import FrontText from '@/components/ui/Front/FrontText'

export default async function ImageBlock({
   className,
   id,
   text,
   gradient,
   bgClass,
   revert = false,
}: {
   className?: string
   id: string
   text: { title: string; content: string }
   gradient: string
   revert?: boolean
   bgClass: string
}) {
   return (
      <div className={cn(`grid place-items-center`, className)} id={id}>
         <div
            className={cn(
               `relative h-[80dvh] w-full 768p:h-[60%]`,
               classes.image_bg,
               bgClass
            )}
         >
            <section
               className="grid h-full w-full grid-cols-1 place-items-center bg-[#8A8A8A]/50 px-[10%] dark:bg-[#121212]/50 768p:grid-cols-2 768p:bg-[#8A8A8A]/80 768p:dark:bg-[#121212]/80 1080p:px-[20%]"
               aria-label="Блок с информацией"
            >
               <FrontTitle
                  className={cn(
                     'z-20 px-4 py-2',
                     revert && 'order-2 self-start 500p:self-center'
                  )}
               >
                  {text.title}
               </FrontTitle>
               <FrontText
                  className={
                     revert
                        ? 'order-1 self-center'
                        : 'self-start text-center 768p:self-center 768p:text-end'
                  }
               >
                  {text.content}
               </FrontText>
               <span className="absolute z-10 768p:right-4">
                  <Image src={gradient} alt="gradient" aria-hidden={true} />
               </span>
            </section>
         </div>
      </div>
   )
}
