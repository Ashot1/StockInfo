import { FC } from 'react'
import CustomContentBlock from '@/components/entity/Front/CustomContentBlock'
import nextjs from './assets/Technologies/next-js.svg'
import tailwind from './assets/Technologies/Tailwind.png'
import supabase from './assets/Technologies/supabase-logo-icon.png'
import shadcn from './assets/Technologies/shadcn.png'
import framer from './assets/Technologies/framer-motion.svg'
import react from './assets/Technologies/react.png'
import Image from 'next/image'
import { cn } from '@/utils/utils'
import Link from 'next/link'
import gradient from './assets/gradient.svg'

const TechBlock: FC<{ id: string }> = async ({ id }) => {
   const img = [
      {
         img: nextjs,
         isInvert: true,
         text: 'Next JS',
         url: 'https://nextjs.org',
      },
      { img: react, text: 'React JS', url: 'https://react.dev' },
      { img: tailwind, text: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
      {
         img: shadcn,
         isInvert: true,
         text: 'ShadCN UI',
         url: 'https://ui.shadcn.com',
      },
      {
         img: framer,
         text: 'Framer Motion',
         url: 'https://www.framer.com/motion/',
      },
      { img: supabase, text: 'Supabase', url: 'https://supabase.com/' },
   ]

   return (
      <CustomContentBlock
         gradient={gradient}
         id={id}
         className="snap-selector min-h-screen snap-center snap-always px-[10%] 1080p:px-[20%]"
         text={{
            title: 'Современные технологии для вашего удобства',
            content: `Наше приложение создано с использованием передовых технологий для вашего удобства. 
            Мы применяем Tailwind CSS для адаптивного дизайна, Next.js для быстрой работы, 
            ShadCN UI для интуитивного интерфейса, Framer Motion для плавной анимации, 
            Supabase для надежного хранения данных и React.js для интерактивного интерфейса. 
            Все это обеспечивает вам удобное и безопасное управление инвестициями.`,
         }}
         revert
      >
         <div className="grid grid-cols-3 gap-6">
            {img.map((item) => (
               <Link
                  key={item.url}
                  href={item.url}
                  className="flex max-w-20 rounded-2xl border-2 border-transparent p-4 duration-300 hover:border-white/30 hover:bg-gray-500 768p:max-w-24"
               >
                  <Image
                     src={item.img}
                     alt={item.text}
                     className={cn(item.isInvert && 'invert')}
                  />
               </Link>
            ))}
         </div>
      </CustomContentBlock>
   )
}

export default TechBlock
