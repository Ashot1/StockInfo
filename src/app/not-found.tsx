import { cn } from '@/utils/utils'
import { poiretone, tektur } from '@/utils/fonts'
import Link from 'next/link'
import FadedButton from '@/components/ui/FadedButton'
import BackButton from '@/components/entity/BackButton'
import { AuroraBackground } from '@/components/ui/HightOrder/AuroraBackground'

export default function NotFound() {
   return (
      <AuroraBackground allowFullScreen>
         <div className="z-30 grid grid-cols-1 gap-3">
            <NumberText />
            <p className={cn('animate-fast-appearance', tektur.className)}>
               Эта страница не найдена
            </p>
            <FadedButton
               variant="outlined"
               anotherElement={true}
               className="mt-5 animate-appearance p-0"
            >
               <Link href="/" className="flex-1 py-1.5 text-center">
                  На главную
               </Link>
            </FadedButton>
            <BackButton className="animate-appearance" />
         </div>
      </AuroraBackground>
   )
}

const NumberText = () => {
   const text = '404'.split('')

   return (
      <span
         className={cn(
            'flex justify-center gap-2 text-7xl',
            poiretone.className
         )}
      >
         {text.map((letter, index) => {
            const delay = 100 * index
            return (
               <p
                  key={`${letter}${index}`}
                  className={`delay-${delay} animate-fast-appearance-moving-top opacity-0 fill-mode-forwards`}
               >
                  {letter}
               </p>
            )
         })}
      </span>
   )
}
