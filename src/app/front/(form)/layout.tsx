import ScrollSnapBlock from '@/components/ui/HightOrder/ScrollSnapBlock'
import { cn } from '@/utils/utils'
import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { comfortaa } from '@/utils/fonts'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { URLList } from '@/utils/const'
import { Cross1Icon } from '@radix-ui/react-icons'

export default function FormLayout({ children }: { children: ReactNode }) {
   const links = [
      {
         id: 'firstBlock',
         title: 'Добро пожаловать в мир инвестиций!',
         content: 'Авторизуйтесь, чтобы продолжить.',
         img: '/signup/login2.png',
      },
      {
         id: 'secondBlock',
         title: 'Еще не с нами?',
         content:
            'Зарегистрируйтесь и начните свой путь в мире виртуальных инвестиций.',
         img: '/signup/register2.png',
      },
      {
         id: 'thirdBlock',
         title: 'Знания — сила',
         content: 'Изучайте рыночные данные и принимайте обоснованные решения.',
         img: '/signup/study.png',
      },
      {
         id: 'fourthBlock',
         title: 'Анализируйте и побеждайте',
         content: 'Используйте наши инструменты для улучшения стратегий.',
         img: '/signup/analysis.png',
      },
   ]
   return (
      <div className="grid min-h-dvh w-dvw place-items-center bg-gradient-to-l from-sky-600 to-teal-600 py-20">
         <div className="relative grid min-h-[80dvh] w-[95dvw] max-w-[1000px] grid-cols-1 overflow-hidden rounded-2xl shadow 500p:grid-cols-2 1024p:w-[60dvw]">
            <ScrollSnapBlock
               autoScroll={{ duration: 4000, mode: 'wideOnly' }}
               direction="horizontal"
               className="order-2 h-full w-full bg-white/30 pb-20 500p:order-1"
               navigationPosition={{ wide: 'bottom', mobile: 'bottom' }}
               links={links.map((item) => item.id)}
               navigatesClassName="bg-transparent border-none 500p:left-[25%]"
            >
               {links.map((item) => (
                  <ScrollItem
                     key={item.id}
                     id={item.id}
                     title={item.title}
                     img={item.img}
                     content={item.content}
                  />
               ))}
            </ScrollSnapBlock>
            <div className="order-1 h-full w-full bg-white/90 text-neutral-700 500p:order-2">
               <div className="flex w-full items-center justify-between px-5 py-4 500p:px-10">
                  <Logo variant="filled" scale={0.55} className="h-5" />
                  <Link
                     href={URLList.front}
                     className="rounded-full p-2 hover:bg-white"
                  >
                     <Cross1Icon className="size-4" />
                  </Link>
               </div>
               {children}
            </div>
         </div>
      </div>
   )
}

const ScrollItem: FC<{
   id: string
   className?: string
   title: string
   content: string
   img: string
}> = ({ id, className, content, title, img }) => {
   return (
      <div
         className={cn(
            'snap-selector relative grid h-full w-full flex-shrink-0 snap-center place-items-center px-5 py-4',
            className
         )}
         id={id}
      >
         <Image
            src={img}
            alt={title}
            width={400}
            height={400}
            className="rounded-3xl"
         />
         <div
            className={cn(
               'self-start text-pretty text-center',
               comfortaa.className
            )}
         >
            <h1 className="text-base">{title}</h1>
            <p className="text-sm opacity-60">{content}</p>
         </div>
      </div>
   )
}
