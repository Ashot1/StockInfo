'use client'

import { FC, HTMLAttributes, ReactNode, useEffect } from 'react'
import ScrollDotMenu, {
   ScrollDotMenuDirections,
   ScrollDotMenuProps,
} from '@/components/ui/ScrollDotMenu'
import { cn } from '@/utils/utils'
import { useChildObserver } from '@/hooks/Observer'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { useRouter } from 'next/navigation'

export interface ScrollSnapBlockProps
   extends Pick<ScrollDotMenuProps, 'links'>,
      HTMLAttributes<HTMLDivElement> {
   children: ReactNode
   className?: string
   navigatesClassName?: string
   navigationPosition?: {
      wide: ScrollDotMenuDirections
      mobile: ScrollDotMenuDirections
   }
   direction?: 'horizontal' | 'vertical'
   autoScroll?: { duration?: number; mode: 'wideOnly' | boolean }
}

// у всех children должен быть .snap-selector и .snap-center

const ScrollSnapBlock: FC<ScrollSnapBlockProps> = ({
   children,
   links,
   className,
   navigatesClassName,
   navigationPosition = { wide: 'right', mobile: 'top' },
   direction,
   autoScroll = { duration: 4000, mode: false },
   ...props
}) => {
   const isMobile = useMatchMedia(750)
   const NowInVision = useChildObserver(
      {
         parentSelector: '.parent-snap-selector',
         selector: '.snap-selector',
      },
      [links]
   )
   const { replace } = useRouter()
   const formatedLinks = links?.map((item) => `#${item}`)

   useEffect(() => {
      if (!NowInVision || !formatedLinks) return
      if (!autoScroll.duration || !autoScroll.mode) return
      if (autoScroll.mode === 'wideOnly' && isMobile) return

      const nextElement = formatedLinks.indexOf(NowInVision) + 1

      const link =
         nextElement < formatedLinks.length
            ? formatedLinks[nextElement]
            : formatedLinks[0]

      const nextSlide = setTimeout(() => {
         replace(link)
      }, autoScroll.duration)

      return () => clearTimeout(nextSlide)
   }, [NowInVision, autoScroll, formatedLinks])

   return (
      <>
         <div
            className={cn(
               'scroll-hidden hideScrollBar parent-snap-selector max-h-dvh snap-mandatory scroll-smooth',
               direction === 'horizontal'
                  ? 'flex snap-x overflow-x-scroll'
                  : 'snap-y overflow-y-scroll',
               className
            )}
            {...props}
         >
            {children}
         </div>
         {isMobile !== null && (
            <ScrollDotMenu
               links={formatedLinks}
               direction={
                  isMobile ? navigationPosition.mobile : navigationPosition.wide
               }
               activeItemLink={NowInVision}
               className={navigatesClassName}
            />
         )}
      </>
   )
}

export default ScrollSnapBlock
