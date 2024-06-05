import { FC } from 'react'
import gradient from './assets/gradient.svg'
import ImageBlock from '@/components/entity/Front/ImageBlock'

const FavoritesBlock: FC<{ id: string }> = async ({ id }) => {
   return (
      <ImageBlock
         revert={true}
         gradient={gradient}
         bgClass={`bg-[url('/manifest/Screenshots/Favorites.png')] 500p:bg-[url('/manifest/Screenshots/Favorites-wide.png')]`}
         text={{
            content: `Сохраняйте важную информацию в закладки, 
            чтобы всегда иметь к ней быстрый доступ. 
            Наше приложение позволяет легко сохранять и организовывать данные, 
            чтобы вы могли вернуться к ним в любое время.`,
            title: 'Сохраняй, чтобы не забыть',
         }}
         className="snap-selector min-h-screen snap-center snap-always"
         id={id}
      />
   )
}

export default FavoritesBlock
