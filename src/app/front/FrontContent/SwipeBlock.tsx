import { FC } from 'react'
import PhoneBlock from '@/components/entity/Front/PhoneBlock'
import gradient from './assets/gradient.svg'
import swipeGIF from './assets/gifs/swipe.gif'

const SwipeBlock: FC<{ id: string }> = async ({ id }) => {
   return (
      <PhoneBlock
         id={id}
         className="snap-selector min-h-screen snap-center snap-always px-[10%] 1080p:px-[20%]"
         gradient={gradient}
         gif={swipeGIF}
         text={{
            title: 'Пользуйся с удобством',
            content: `Наше приложение разработано для удобства использования: 
            интуитивные свайпы делают навигацию и взаимодействие с приложением простым и приятным. 
            Наслаждайтесь легкостью управления своими инвестициями.`,
         }}
      />
   )
}

export default SwipeBlock
