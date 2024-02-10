'use client'

import { FC } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'

const ScrollStateBar: FC = () => {
	const { scrollYProgress } = useScroll()
	const scaleX = useSpring(scrollYProgress)

	return <motion.div className='bg-[hsl(var(--primary))] fixed h-1 w-screen origin-left z-10' style={{ scaleX }} />
}

export default ScrollStateBar