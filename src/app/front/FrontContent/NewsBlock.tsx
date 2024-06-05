import { FC } from 'react'
import ImageBlock from '@/components/entity/Front/ImageBlock'
import gradient from './assets/gradient.svg'

const NewsBlock: FC<{ id: string }> = async ({ id }) => {
   return (
      <ImageBlock
         gradient={gradient}
         bgClass={`bg-[url('/manifest/Screenshots/News.png')] 500p:bg-[url('/manifest/Screenshots/News-wide.png')]`}
         text={{
            content: `Получайте последние новости в реальном времени. Наше
                  приложение поможет вам всегда быть информированным о важнейших
                  рыночных событиях. Учитесь анализировать рынок и принимайте
                  обоснованные решения.`,
            title: 'Будь в курсе событий',
         }}
         className="snap-selector min-h-screen snap-center snap-always"
         id={id}
      />
   )
}

export default NewsBlock
