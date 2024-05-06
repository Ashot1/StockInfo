'use client'

import Link from 'next/link'
import { MobileScreen, URLList } from '@/utils/const'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { FC, Fragment, memo, useRef, useState } from 'react'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { usePathname } from 'next/navigation'
import { raleway } from '@/utils/fonts'
import Image from 'next/image'
import { cn } from '@/utils/utils'

interface IMainHeader {
   HeaderButtons: { text: string; icon: StaticImport; link: string }[]
}

export default function MainHeader({ HeaderButtons }: IMainHeader) {
   const [IsHidden, setIsHidden] = useState(false)
   const { scrollY } = useScroll()
   const prevScrollValue = useRef(40)
   const isMobile = useMatchMedia(MobileScreen)
   const direction = isMobile ? 150 : -150

   useMotionValueEvent(scrollY, 'change', (latest) => {
      const difference = prevScrollValue.current < latest
      prevScrollValue.current = latest

      const timer = setTimeout(() => {
         setIsHidden(difference)
      }, 250)

      return () => clearTimeout(timer)
   })

   if (isMobile === null) return

   return (
      <motion.header
         initial={{ y: direction }}
         animate={{ y: IsHidden ? direction : 0 }}
         transition={{ duration: 0.4 }}
         className="pointer-events-none fixed bottom-4 z-30 grid
       w-full place-items-center px-3
        300p:px-6 768p:bottom-auto 768p:top-6 768p:px-10"
      >
         <nav
            className="pointer-events-auto flex h-full w-full min-w-[200px] max-w-[500px] justify-evenly rounded-[30px]
        border border-[rgba(190,190,190,.3)] bg-[rgb(190,190,190,.1)] px-3 py-3 shadow-lg backdrop-blur-lg
        duration-100 hover:border-[rgba(190,190,190,.4)] hover:bg-[rgb(190,190,190,.2)]
        dark:border-[rgba(242,242,242,.1)] dark:bg-[rgba(242,242,242,.05)]
        dark:shadow-[0_10px_25px_rgba(0,0,0,.15)] dark:hover:border-[rgba(242,242,242,.15)]
        dark:hover:bg-[rgba(242,242,242,.07)] 768p:max-w-[1000px] 768p:grid-cols-6 768p:justify-between 768p:rounded-[10px] 768p:px-6"
         >
            <Link
               href={URLList.home}
               className="hidden w-32 items-center opacity-80
            transition-all duration-500 hover:drop-shadow-[0_0_15px_var(--Main)] hover:[text-shadow:_0_0_10px_#3b82f6] 768p:flex"
            >
               <Logo
                  scale={0.55}
                  variant="filled"
                  color="var(--Main)"
                  className="h-[20px]"
               />
            </Link>
            <Buttons HeaderButtons={HeaderButtons} />
            <div className="hidden items-center justify-end 768p:flex">
               <MainMenuDropDown />
            </div>
         </nav>
      </motion.header>
   )
}

const Buttons: FC<IMainHeader> = ({ HeaderButtons }) => {
   const [HoverElement, setHoverElement] = useState<
      (EventTarget & HTMLAnchorElement) | null
   >(null)
   const pathname = usePathname()

   const baseClass = 'opacity-40 768p:opacity-60 dark:opacity-60',
      activeClass =
         'scale-110 768p:scale-100 bg-neutral-500/20 dark:bg-[rgba(242,242,242,.05)]',
      activeBar =
         'before:bottom-0 before:h-[2px] before:w-4 before:bg-black/90 before:shadow-[0_2px_25px_2px_black] dark:before:bg-white dark:before:shadow-[0_2px_25px_2px_#fff] before:animate-fast-appearance'

   return (
      <>
         <AnimatePresence>
            {HoverElement && (
               <motion.div
                  className={`absolute rounded-md ${activeClass}`}
                  initial={{
                     scale: 0,
                     width: HoverElement.clientWidth,
                     height: HoverElement.clientHeight,
                     left: HoverElement.offsetLeft,
                     top: HoverElement.offsetTop,
                  }}
                  animate={{
                     scale: 1,
                     width: HoverElement.clientWidth,
                     height: HoverElement.clientHeight,
                     left: HoverElement.offsetLeft,
                     top: HoverElement.offsetTop,
                     transition: { duration: 0.3 },
                  }}
                  exit={{ scale: 0 }}
               />
            )}
         </AnimatePresence>
         {HeaderButtons.map((item) => {
            const HomePageCondition =
               pathname.split('?')[0] === '/' && item.link === URLList.home

            return (
               <div
                  key={item.link}
                  onMouseEnter={(e) =>
                     setHoverElement(
                        e.currentTarget.children[0] as EventTarget &
                           HTMLAnchorElement
                     )
                  }
                  onMouseLeave={() => setHoverElement(null)}
                  className={cn(
                     'grid flex-1 place-items-center',
                     item.link.split('?')[0] === URLList.home && 'hidden'
                  )}
               >
                  <Link
                     href={item.link}
                     prefetch={false}
                     className={cn(
                        `relative flex items-center justify-center rounded-md px-3 py-2 transition-all before:absolute 768p:px-4`,
                        raleway.className,
                        pathname.startsWith(item.link) || HomePageCondition
                           ? `${activeClass} ${activeBar}`
                           : baseClass
                     )}
                  >
                     <Image
                        src={item.icon}
                        alt={item.text}
                        className={`w-[1.35rem] dark:invert 500p:w-6 768p:hidden`}
                     />
                     <p className={'hidden 768p:block'}>{item.text}</p>
                  </Link>
               </div>
            )
         })}
      </>
   )
}
