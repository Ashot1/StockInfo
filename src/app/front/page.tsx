import Link from 'next/link'
import { URLList } from '@/utils/const'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { russoOne } from '@/utils/fonts'
import { cn } from '@/utils/utils'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { FC } from 'react'
import { Session } from '@supabase/auth-js'
import { CaretDownIcon } from '@radix-ui/react-icons'

export default async function HomePage() {
   const {
      data: { session },
   } = await SupabaseCustomServer().auth.getSession()

   return (
      <div>
         <b>Front</b>
         <br />
         <Link href={URLList.login}>Login</Link>
         <FirstBlock session={session} />
      </div>
   )
}

const FirstBlock: FC<{ session: Session | null }> = ({ session }) => {
   return (
      <AuroraBackground allowFullScreen>
         <div className="flex flex-col gap-2 text-pretty text-center text-white">
            <h2
               className={cn(
                  russoOne.className,
                  'maskText animate-fast-appearance-moving-top text-3xl 768p:text-5xl'
               )}
            >
               Твой первый шаг к инвестициям
            </h2>
            <div className="flex justify-center gap-2 text-sm opacity-60 768p:text-lg">
               {'Торгуй акциями на виртуальной платформе'
                  .split(' ')
                  .map((word, index) => {
                     const delay = 100 * index
                     return (
                        <p
                           key={`${word}${index}`}
                           className={`delay-${delay} animate-appearance opacity-0 fill-mode-forwards`}
                        >
                           {word}
                        </p>
                     )
                  })}
            </div>
         </div>
         <Link
            href={session?.user ? URLList.home : URLList.login}
            className={`z-20 mt-10 animate-scaling rounded-full border-2 border-primary/15 bg-secondary/10 px-4 py-2 text-sm 
                        text-secondary-foreground duration-300 hover:border-primary/30 hover:bg-secondary/20`}
         >
            Начать
         </Link>
         <Link
            href="#"
            className="absolute bottom-20 flex animate-pulse flex-col items-center justify-center text-sm text-white/20"
         >
            Узнать больше <CaretDownIcon className="size-6" />
         </Link>
      </AuroraBackground>
   )
}
