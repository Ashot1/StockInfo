'use client'
import { useEffect } from 'react'
import { AuroraBackground } from '@/components/ui/HightOrder/AuroraBackground'
import FadedButton from '@/components/ui/Buttons/FadedButton'
import ErrorMessage from '@/components/ui/ErrorMessage'

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => console.error(error), [error])

   return (
      <AuroraBackground allowFullScreen={true}>
         <ErrorMessage
            className="z-30 max-w-[75%] gap-3 dark:text-white"
            errMessage={error.message}
         >
            <FadedButton
               variant="outlined"
               onClick={() => reset()}
               className="mt-5 animate-appearance"
            >
               Повторить
            </FadedButton>
         </ErrorMessage>
      </AuroraBackground>
   )
}
