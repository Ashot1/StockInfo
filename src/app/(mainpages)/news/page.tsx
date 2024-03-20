import PageTitle from '@/components/ui/PageTitle'
import NewsListItem from '@/components/ui/NewsListItem'
import { URLList } from '@/utils/const'
import { Metadata } from 'next'
import CustomPagination from '@/components/entity/CustomPagination'
import { getNews } from '@/actions/News'
import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'
import { comfortaa } from '@/utils/fonts'
import ErrorMessage from '@/components/ui/ErrorMessage'

export const metadata: Metadata = {
   title: 'Новости',
   description: 'Новости Московской Биржи (MOEX)',
   openGraph: {
      title: 'Новости',
      description: 'Новости Московской Биржи (MOEX)',
   },
   twitter: {
      title: 'Новости',
      description: 'Новости Московской Биржи (MOEX)',
   },
}

export default async function News({
   searchParams,
}: {
   searchParams: { start?: string }
}) {
   return (
      <>
         <PageTitle>Новости</PageTitle>
         <Suspense fallback={<CenterScreenLoader />}>
            <MainContent start={searchParams?.start} />
         </Suspense>
      </>
   )
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data: newsList, error } = await getNews(start)

   if (!newsList || error) return <ErrorMessage errMessage={error} />

   const id = newsList.sitenews.columns.indexOf('id')
   const title = newsList.sitenews.columns.indexOf('title')
   const createdAt = newsList.sitenews.columns.indexOf('published_at')
   const editedAt = newsList.sitenews.columns.indexOf('modified_at')
   const maxSize = newsList['sitenews.cursor'].columns.indexOf('TOTAL')
   let startIndex = parseInt(start || '0')

   if (startIndex < 0) startIndex = 0
   return (
      <>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={newsList['sitenews.cursor'].data[0][maxSize]}
         />
         <section
            className="my-5 flex flex-1 flex-col
                rounded-2xl border-2 bg-neutral-200 bg-opacity-40 p-2 opacity-85 500p:ml-0 500p:w-full 768p:p-4 dark:bg-neutral-900 dark:bg-opacity-50"
         >
            {newsList.sitenews.data.length <= 0 && (
               <div
                  className={`grid w-full flex-1 place-items-center ${comfortaa.className}`}
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
                            delay-${100 * (index <= 20 ? index : 20)}
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
      </>
   )
}
