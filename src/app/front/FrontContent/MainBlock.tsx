import { Session } from '@supabase/auth-js'
import { FC } from 'react'
import HeroBlock from '@/components/entity/Front/HeroBlock'
import { URLList } from '@/utils/config'

const MainBlock: FC<{
   session: Session | null
   id: string
   nextLink: string
}> = async ({ session, id, nextLink }) => {
   const words = [
      'Покупай ценные бумаги на виртуальной платформе',
      'Следи за котировками ценных бумаг',
      'Узнавай последние новости биржи',
      'Следи за актуальными курсами валюты',
   ]
   return (
      <HeroBlock
         title="Твой первый шаг к инвестициям"
         words={words}
         startButton={{
            text: 'Начать',
            url: session?.user ? URLList.home : URLList.login,
         }}
         nextLink={{ text: 'Узнать больше', url: nextLink }}
         className="snap-selector min-h-screen snap-center snap-always"
         id={id}
      />
   )
}
export default MainBlock
