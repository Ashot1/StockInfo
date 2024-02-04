import BackButton from '@/components/entity/BackButton'
import { URLList } from '@/utils/const'
import { raleway } from '@/utils/fonts'
import ArrowSeparator from '@/components/ui/ArrowSeparator'
import { redirect } from 'next/navigation'
import { ConvertDate } from '@/utils/ConvertDate'
import { FilePlusIcon } from '@radix-ui/react-icons'
import { getCurrentNews } from '@/actions/News'
import { Suspense } from 'react'
import CenterScreenLoader from '@/components/entity/CenterScreenLoader'

export async function generateMetadata({ params }: { params: { id: string } }) {
   const { data: resJSON } = await getCurrentNews(params.id)
   if (!resJSON)
      return {
         title: 'Новость с московской биржи',
         authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
         openGraph: {
            title: 'Новость с московской биржи',
            authors: 'Московская биржа',
         },
         twitter: {
            title: 'Новость с московской биржи',
         },
      }
   const titleCol = resJSON.content.columns.indexOf('title')
   const title = resJSON.content.data[0][titleCol] as string

   return {
      title: title,
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title: title,
         authors: 'Московская биржа',
      },
      twitter: {
         title: title,
      },
   }
}

export default async function SpecificNews({
   params: { id },
}: {
   params: { id: string }
}) {
   const { data: CurrentNews, error } = await getCurrentNews(id)

   // TODO: сделать нормальное отображение
   if (!CurrentNews || error)
      return (
         <div className="w-full h-full grid place-items-center">
            Произошла ошибка <br /> {error}
         </div>
      )
   const title = CurrentNews.content.columns.indexOf('title')
   const body = CurrentNews.content.columns.indexOf('body')
   const publishedAt = CurrentNews.content.columns.indexOf('published_at')

   if (!CurrentNews.content.data[0]) {
      redirect(URLList.notFound)
      return
   }

   const news = CurrentNews.content.data[0]

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <div className="animate-appearance">
            <div className="w-full flex text-center flex-col items-center gap-14">
               <BackButton />
               <p
                  className={`w-full text-pretty text-lg ${raleway.className}`}
                  dangerouslySetInnerHTML={{ __html: news[title] }}
               ></p>
            </div>
            <ArrowSeparator />
            <span className="w-full m-0 flex justify-start mb-3 items-center gap-1 opacity-50 text-xs">
               <FilePlusIcon />
               {ConvertDate(news[publishedAt] as string)}
            </span>
            <div
               className="bg-neutral-200 dark:bg-neutral-900 bg-opacity-20 dark:bg-opacity-50
          rounded-lg p-3 768p:p-6 shadow text-sm styledNewsContent overflow-x-auto"
               dangerouslySetInnerHTML={{
                  __html: news[body] as string,
               }}
            ></div>
         </div>
      </Suspense>
   )
}
