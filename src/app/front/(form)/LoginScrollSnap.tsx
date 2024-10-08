import { FC } from 'react'
import ScrollSnapBlock from '@/components/ui/HightOrder/ScrollSnapBlock'
import { cn } from '@/utils/utils'
import Image from 'next/image'
import { comfortaa } from '@/utils/fonts'

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
      img: '/signup/study2.png',
   },
   {
      id: 'fourthBlock',
      title: 'Анализируйте и побеждайте',
      content: 'Используйте наши инструменты для улучшения стратегий.',
      img: '/signup/analysis.png',
   },
]

const LoginScrollSnap: FC = () => {
   return (
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
   )
}

export default LoginScrollSnap

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
