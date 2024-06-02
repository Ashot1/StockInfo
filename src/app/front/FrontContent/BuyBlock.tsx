import { FC } from 'react'
import PhoneBlock from '@/components/entity/Front/PhoneBlock'
import gradient from '../assets/gradient.svg'
import BuyGif from '../assets/gifs/BUY.gif'

const BuyBlock: FC<{ id: string }> = async ({ id }) => {
   return (
      <PhoneBlock
         revert={true}
         gradient={gradient}
         gif={BuyGif}
         className="snap-selector min-h-screen snap-center snap-always px-[10%] 1080p:px-[20%]"
         id={id}
         text={{
            content: `Покупай и продавай ценные бумаги виртуальными деньгами и учись
                  принимать правильные финансовые решения. Идеальный способ
                  начать свой путь в мире инвестиций без риска.`,
            title: 'Инвестируй легко и уверенно',
         }}
      />
   )
}

export default BuyBlock
