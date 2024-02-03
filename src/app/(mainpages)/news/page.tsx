import PageTitle from '@/components/ui/PageTitle'
import NewsListItem from '@/components/ui/NewsListItem'
import { URLList } from '@/utils/const'
import { Metadata } from 'next'
import CustomPagination from '@/components/entity/CustomPagination'
import { getNews } from '@/actions/News'
import { Suspense } from 'react'
import Loader from '@/components/ui/loader'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { comfortaa } from '@/utils/fonts'

export const metadata: Metadata = {
   title: 'Новости',
   description: 'Новости Московской Биржи (MOEX)',
}

export default async function News({
   searchParams,
}: {
   searchParams: { start?: string }
}) {
   const { data: newsList, error } = await getNews(searchParams.start)

   // TODO: сделать нормальное отображение
   if (!newsList || error)
      return (
         <div className="w-full h-full grid place-items-center">
            Произошла ошибка <br /> {error}
         </div>
      )

   const id = newsList.sitenews.columns.indexOf('id')
   const title = newsList.sitenews.columns.indexOf('title')
   const createdAt = newsList.sitenews.columns.indexOf('published_at')
   const editedAt = newsList.sitenews.columns.indexOf('modified_at')
   const maxSize = newsList['sitenews.cursor'].columns.indexOf('TOTAL')
   let startIndex = parseInt(searchParams.start || '0')

   if (startIndex < 0) startIndex = 0

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <PageTitle>Новости</PageTitle>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={newsList['sitenews.cursor'].data[0][maxSize]}
         />
         <section
            className="bg-neutral-200 dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-50
                p-2 768p:p-4 rounded-2xl border-2 500p:ml-0 500p:w-full my-5 opacity-85 flex-1 flex flex-col"
         >
            {newsList.sitenews.data.length <= 0 && (
               <div
                  className={`grid place-items-center w-full flex-1 ${comfortaa.className}`}
               >
                  Пусто
               </div>
            )}

            {newsList.sitenews.data.map((news, index) => {
               return (
                  <NewsListItem
                     key={news[id]}
                     link={`${URLList.news}/${news[id]}`}
                     Title={news[title] as string}
                     createdAt={news[createdAt] as string}
                     editedAt={news[editedAt] as string}
                     index={index + 1 + startIndex}
                     ClassName={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * index}
                            `}
                  />
               )
            })}
         </section>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={newsList['sitenews.cursor'].data[0][maxSize]}
         />
      </Suspense>
   )
}
