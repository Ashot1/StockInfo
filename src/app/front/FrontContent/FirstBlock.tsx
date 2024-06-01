import { Session } from '@supabase/auth-js'
import { AuroraBackground } from '@/components/ui/HightOrder/AuroraBackground'
import { URLList } from '@/utils/const'
import Link from 'next/link'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils/utils'
import { russoOne } from '@/utils/fonts'
import SmoothAppearanceWords from '@/components/ui/SmoothAppearanceWords'
import PrettyButton from '@/components/ui/PrettyButton'

export default async function FirstBlock({
   session,
   className,
   id,
   nextLink,
}: {
   session: Session | null
   className?: string
   id: string
   nextLink: string
}) {
   const words = [
      'Покупай ценные бумаги на виртуальной платформе',
      'Следи за котировками ценных бумаг',
      'Узнавай последние новости биржи',
      'Следи за актуальными курсами валюты',
   ]

   return (
      <AuroraBackground className={cn('bottomHiddenMask', className)} id={id}>
         <div className="flex flex-col gap-2 text-pretty text-center text-white">
            <h2
               className={cn(
                  russoOne.className,
                  'startTextMask animate-middle-appearance-moving-top text-3xl 768p:text-5xl'
               )}
            >
               Твой первый шаг к инвестициям
            </h2>
            <SmoothAppearanceWords
               className="flex flex-wrap justify-center gap-2 px-2 text-sm opacity-50 768p:text-lg"
               words={words}
            />
         </div>
         <PrettyButton
            href={session?.user ? URLList.home : URLList.login}
            className="mt-12 animate-scaling"
         >
            Начать
         </PrettyButton>
         <Link
            href={nextLink}
            className="absolute bottom-[15%] flex animate-pulse flex-col items-center justify-center text-sm text-white/20"
         >
            Узнать больше <CaretDownIcon className="size-6" />
         </Link>
      </AuroraBackground>
   )
}
