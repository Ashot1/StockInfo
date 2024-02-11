'use client'

import HeaderButton from '@/components/entity/HeaderButton'
import Link from 'next/link'
import { URLList } from '@/utils/const'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface IMainHeader {
   HeaderButtons: { text: string; icon: StaticImport; link: string }[]
}

export default function MainHeader({ HeaderButtons }: IMainHeader) {
   const [IsHidden, setIsHidden] = useState(false)
   const { scrollY } = useScroll()
   const prevScrollValue = useRef(40)
   const isMobile = useMatchMedia(820)
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
         className="pointer-events-none fixed bottom-4 z-30 grid
       w-full place-items-center px-3
        300p:px-6 768p:bottom-auto 768p:top-6 768p:px-10"
      >
         <nav
            className="pointer-events-auto grid h-full w-full min-w-[200px] max-w-[500px]
        grid-cols-5 rounded-[30px] bg-[#979797] bg-opacity-20 px-3 py-3 shadow-lg
        backdrop-blur-md 768p:max-w-[1000px] 768p:grid-cols-6 768p:rounded-[10px] 768p:px-6 dark:bg-white dark:bg-opacity-10"
         >
            <Link
               href={URLList.home}
               className="hidden items-center opacity-80 transition-all
            duration-500 hover:drop-shadow-[0_0_15px_var(--Main)] hover:[text-shadow:_0_0_10px_#3b82f6] 768p:flex"
            >
               <Logo
                  scale={0.55}
                  variant="filled"
                  color="var(--Main)"
                  className="h-[20px]"
               />
            </Link>
            {HeaderButtons.map((item) => (
               <HeaderButton
                  text={item.text}
                  link={item.link}
                  icon={item.icon}
                  key={item.link}
               />
            ))}
            <div className="hidden items-center justify-end 768p:flex">
               <MainMenuDropDown />
            </div>
         </nav>
      </motion.header>
   )
}
