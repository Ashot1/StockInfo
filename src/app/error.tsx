'use client'
import { FC } from 'react'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { cn } from '@/utils/utils'
import FadedButton from '@/components/ui/FadedButton'
import Link from 'next/link'
import BackButton from '@/components/entity/BackButton'
import { tektur } from '@/utils/fonts'

const Error: FC = () => {
   return (
      <AuroraBackground allowFullScreen={true}>
         <div className="z-30 grid grid-cols-1 gap-3">
            <p className={cn('animate-fast-appearance', tektur.className)}>
               Произошла ошибка
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

export default Error
