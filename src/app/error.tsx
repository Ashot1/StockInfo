'use client'
import { FC, useEffect } from 'react'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { cn } from '@/utils/utils'
import FadedButton from '@/components/ui/FadedButton'
import Link from 'next/link'
import BackButton from '@/components/entity/BackButton'
import { tektur } from '@/utils/fonts'

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => console.log(error), [error])

   return (
      <AuroraBackground allowFullScreen={true}>
         <div className="z-30 grid max-w-[75%] grid-cols-1 gap-3 text-center dark:text-white">
            <h2
               className={cn(
                  'animate-fast-appearance text-lg text-red-400 768p:text-xl',
                  tektur.className
               )}
            >
               Произошла ошибка
            </h2>
            <p className="text-center text-sm opacity-85 768p:text-base">
               {error.message}
            </p>
            <FadedButton
               variant="outlined"
               onClick={() => reset()}
               className="mt-5 animate-appearance p-0 py-1.5 text-center"
            >
               Повторить
            </FadedButton>
            <BackButton className="animate-appearance" />
         </div>
      </AuroraBackground>
   )
}
