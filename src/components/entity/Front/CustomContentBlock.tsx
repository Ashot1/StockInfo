import { ReactNode } from 'react'
import { cn } from '@/utils/utils'
import { comfortaa } from '@/utils/fonts'
import Image from 'next/image'
import FrontTitle from '@/components/ui/Front/FrontTitle'

export default async function CustomContentBlock({
   className,
   id,
   text,
   children,
   revert = false,
   gradient,
}: {
   className?: string
   id: string
   text: { content: string; title: string }
   children: ReactNode
   revert?: boolean
   gradient?: string
}) {
   return (
      <div
         className={cn('relative grid place-items-center', className)}
         id={id}
      >
         <section className="grid grid-cols-1 place-items-center gap-16 768p:grid-cols-2">
            <div
               className={cn(
                  'relative grid animate-appearance grid-cols-1 gap-4',
                  revert && 'order-2'
               )}
            >
               <FrontTitle>{text.title}</FrontTitle>
               <p
                  className={cn(
                     'text-pretty text-center text-sm fill-mode-forwards 1024p:text-base',
                     comfortaa.className,
                     revert ? '768p:text-end' : '768p:text-start'
                  )}
               >
                  {text.content}
               </p>
            </div>
            <div
               className={cn(
                  'relative flex flex-col items-center justify-self-center 500p:flex-row',
                  revert
                     ? 'order-1 768p:justify-self-start'
                     : '768p:justify-self-end'
               )}
            >
               {children}
            </div>
         </section>
         <span
            className={cn(
               'absolute -z-20',
               revert
                  ? '-bottom-[10%] 500p:-bottom-60 768p:-right-[60dvw] 768p:bottom-0 1024p:-right-0 4k:bottom-[10%] 4k:right-[10%]'
                  : '-top-[10%] 500p:-top-60 768p:-left-[60dvw] 768p:bottom-32 1024p:-left-[30%] 4k:left-[10%] 4k:top-0'
            )}
         >
            {gradient && <Image src={gradient} alt="gradient" />}
         </span>
      </div>
   )
}
