import NewsListItem from '@/components/ui/NewsListItem'
import { PageStartCounter, URLList } from '@/utils/config'
import { Metadata } from 'next'
import CustomPagination from '@/components/entity/CustomElements/CustomPagination'
import { getNews } from '@/actions/Security/News'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import CalculatePagination from '@/utils/Pagination'
import EmptyListText from '@/components/ui/Lists/DefaultList/EmptyListText'

export const metadata: Metadata = {
   title: 'Новости',
   description: 'Новости Московской Биржи (MOEX)',
   robots: {
      index: true,
      follow: true,
      googleBot: { follow: true, index: true },
   },
   openGraph: {
      title: 'Новости',
      description: 'Новости Московской Биржи (MOEX)',
      url: `${process.env.NEXT_PUBLIC_SITEURL}/news`,
      images: '/Preview.png',
   },
   twitter: {
      title: 'Новости',
      description: 'Новости Московской Биржи (MOEX)',
      images: '/Preview.png',
   },
}

export default async function News(
   props: {
      searchParams: Promise<{ start?: string }>
   }
) {
   const searchParams = await props.searchParams;
   return <MainContent start={searchParams?.start} />
}

const MainContent = async ({ start }: { start?: string }) => {
   const { data: newsList, error } = await getNews(start)

   if (!newsList || error) return <ErrorMessage errMessage={error} />

   const siteNews = newsList[1].sitenews
   const cursor = newsList[1]['sitenews.cursor'][0]

   let startIndex = parseInt(start || '0')

   if (startIndex < 0) startIndex = 0

   const { prevLink, nextLink } = CalculatePagination({
      start: startIndex,
      Step: PageStartCounter,
      maxLength: cursor.TOTAL,
      pathname: URLList.news,
   })

   return (
      <>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={cursor.TOTAL}
         />
         <SwipeNavigator
            next={nextLink}
            prev={prevLink}
            className="my-5 flex flex-1 flex-col rounded-2xl border-2 bg-neutral-300/40 p-2 opacity-85 dark:bg-neutral-900/50 500p:ml-0 500p:w-full 768p:p-4"
         >
            {siteNews.length <= 0 && <EmptyListText text="Пусто" />}

            {siteNews.map((news, index) => {
               return (
                  <NewsListItem
                     key={news.id}
                     link={`${URLList.current_news}/${news.id}`}
                     Title={news.title}
                     createdAt={news.published_at}
                     editedAt={news.modified_at}
                     index={index + 1 + startIndex}
                     ClassName={`animate-appearance-moving opacity-0 fill-mode-forwards
                            delay-${100 * (index <= 15 ? index : 15)}
                            `}
                  />
               )
            })}
         </SwipeNavigator>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={cursor.TOTAL}
         />
      </>
   )
}
