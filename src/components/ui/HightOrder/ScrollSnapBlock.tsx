'use client'

import {
   DetailedHTMLProps,
   FC,
   HTMLAttributes,
   MouseEventHandler,
   ReactNode,
   useEffect,
} from 'react'
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
   direction?: {
      wide: ScrollDotMenuDirections
      mobile: ScrollDotMenuDirections
   }
}

const ScrollSnapBlock: FC<ScrollSnapBlockProps> = ({
   children,
   links,
   className,
   direction = { wide: 'right', mobile: 'top' },
   ...props
}) => {
   const isMobile = useMatchMedia(750)
   const NowInVision = useChildObserver(
      { parentSelector: '.parent-snap-selector', selector: '.snap-selector' },
      [links]
   )
   const { replace } = useRouter()

   useEffect(() => {
      if (!NowInVision) return

      replace(NowInVision)
   }, [NowInVision])

   return (
      <div
         className={cn(
            'scroll-hidden hideScrollBar parent-snap-selector max-h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth',
            className
         )}
         {...props}
      >
         {isMobile !== null && (
            <ScrollDotMenu
               links={links}
               direction={isMobile ? 'top' : 'right'}
               activeItemLink={NowInVision}
            />
         )}
         {children}
      </div>
   )
}

export default ScrollSnapBlock
