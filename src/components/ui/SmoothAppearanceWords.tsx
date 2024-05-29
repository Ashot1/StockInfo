'use client'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { cn } from '@/utils/utils'

export interface SmoothAppearanceWords extends HTMLAttributes<HTMLDivElement> {
   className?: string
   words: string[]
   timeout?: number
}

const SmoothAppearanceWords: FC<SmoothAppearanceWords> = ({
   words,
   className,
   timeout = 6000,
}) => {
   const [CurrentIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
      const interval = setInterval(
         () =>
            setCurrentIndex((prev) =>
               prev + 1 >= words.length ? 0 : prev + 1
            ),
         timeout
      )

      return () => clearInterval(interval)
   }, [words])

   if (words.length <= 0) return

   const currentWord = words[CurrentIndex]

   return (
      <div className={cn('', className)}>
         {currentWord.split(' ').map((word, index) => {
            const delay = 100 * index * 2
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
   )
}

export default SmoothAppearanceWords
