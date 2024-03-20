'use client'

import { FC, useEffect, useState } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'

const ScrollStateBar: FC = () => {
   const [HaveScrollCSS, setHaveScrollCSS] = useState(false)

   useEffect(() => {
      setHaveScrollCSS(navigator.userAgent.indexOf('Firefox') === -1)
   }, [])

   const { scrollYProgress } = useScroll()
   const scaleX = useSpring(scrollYProgress)

   if (HaveScrollCSS)
      return (
         <div className="scrollDependWidth fixed z-10 h-1 w-screen origin-left bg-[hsl(var(--primary))]" />
      )

   return (
      <motion.div
         className="fixed z-10 h-1 w-screen origin-left bg-[hsl(var(--primary))]"
         style={{ scaleX }}
      />
   )
}

export default ScrollStateBar
