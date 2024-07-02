import { AuroraBackground } from '@/components/ui/HightOrder/AuroraBackground'
import Link from 'next/link'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils/utils'
import { russoOne } from '@/utils/fonts'
import SmoothAppearanceWords from '@/components/ui/SmoothAppearanceWords'
import PrettyButton from '@/components/ui/Buttons/PrettyButton'

export default function HeroBlock({
   className,
   id,
   nextLink,
   words,
   title,
   startButton,
}: {
   className?: string
   id: string
   nextLink?: { url: string; text: string }
   words: string[]
   title: string
   startButton: { url: string; text: string }
}) {
   return (
      <AuroraBackground className={cn('bottomHiddenMask', className)} id={id}>
         <div className="flex flex-col gap-2 text-pretty text-center text-white">
            <h2
               className={cn(
                  russoOne.className,
                  'startTextMask animate-middle-appearance-moving-top text-3xl 768p:text-5xl'
               )}
            >
               {title}
            </h2>
            <SmoothAppearanceWords
               className="flex flex-wrap justify-center gap-2 px-2 text-sm opacity-50 768p:text-lg"
               words={words}
            />
         </div>
         <PrettyButton href={startButton.url} className="mt-12 animate-scaling">
            {startButton.text}
         </PrettyButton>
         {nextLink && (
            <Link
               href={nextLink.url}
               className="absolute bottom-[15%] flex animate-pulse flex-col items-center justify-center text-sm text-white/20"
            >
               {nextLink.text} <CaretDownIcon className="size-6" />
            </Link>
         )}
      </AuroraBackground>
   )
}
