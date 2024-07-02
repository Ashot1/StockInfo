'use client'

import {
   forwardRef,
   ReactNode,
   UIEvent,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react'
import { cn } from '@/utils/utils'

export type ScrollBlockProps = {
   children?: ReactNode
   className?: string
   direction?: 'horizontal' | 'vertical'
}

const variants = {
   horizontal: {
      main: 'overflow-y-hidden overflow-x-scroll',
      light: {
         first: '',
         second: '',
         'fir&sec': '',
      },
      dark: {
         first: '',
         second: '',
         'fir&sec': '',
      },
   },
   vertical: {
      main: 'overflow-x-hidden overflow-y-scroll',
      light: {
         first: 'shadow-[inset_0px_35px_20px_-20px_rgba(0,0,0,.1)]',
         second: 'shadow-[inset_0px_-35px_20px_-20px_rgba(0,0,0,.1)]',
         'fir&sec':
            'shadow-[inset_0px_35px_20px_-20px_rgba(0,0,0,.1),inset_0px_-35px_20px_-20px_rgba(0,0,0,.1)]',
      },
      dark: {
         first: 'dark:shadow-[inset_0px_35px_20px_-20px_rgba(255,255,255,.07)]',
         second:
            'dark:shadow-[inset_0px_-35px_20px_-20px_rgba(255,255,255,.07)]',
         'fir&sec':
            'dark:shadow-[inset_0px_35px_20px_-20px_rgba(255,255,255,.07),inset_0px_-35px_20px_-20px_rgba(255,255,255,.07)]',
      },
   },
}

const ScrollBlock = forwardRef<HTMLDivElement, ScrollBlockProps>(
   ({ children, className, direction = 'vertical' }, ref) => {
      const [State, setState] = useState<'first' | 'second' | 'fir&sec' | null>(
         null
      )
      const Element = useRef<HTMLDivElement>(null)

      const Variant = variants[direction]

      useEffect(() => {
         if (!Element.current) return

         if (Element.current.scrollHeight > Element.current.clientHeight)
            setState('second')
      }, [Element])

      const ScrollChanges = (e: UIEvent) => {
         if (e.currentTarget.scrollHeight <= e.currentTarget.clientHeight)
            return

         const maxScroll =
               e.currentTarget.scrollHeight - e.currentTarget.clientHeight,
            currentScroll = e.currentTarget.scrollTop

         if (currentScroll <= maxScroll / 4) return setState('second')

         if (currentScroll >= maxScroll - maxScroll / 4)
            return setState('first')

         setState('fir&sec')
      }

      useImperativeHandle(ref, () => Element.current!, [Element])

      return (
         <div
            ref={Element}
            onScroll={ScrollChanges}
            className={cn(
               `custom-scroll rounded-2xl duration-300 ${Variant.main}`,
               State === 'first' &&
                  `${Variant.light.first} ${Variant.dark.first}`,
               State === 'second' &&
                  `${Variant.light.second} ${Variant.dark.second}`,
               State === 'fir&sec' &&
                  `${Variant.light['fir&sec']} ${Variant.dark['fir&sec']}`,
               className
            )}
         >
            {children}
         </div>
      )
   }
)

ScrollBlock.displayName = 'ScrollBlock'

export default ScrollBlock
