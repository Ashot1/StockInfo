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
import ErrorMessage from '@/components/ui/ErrorMessage'

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

   if (!CurrentNews || error) return <ErrorMessage errMessage={error} />

   if (!CurrentNews.content.data[0]) {
      redirect(URLList.notFound)
      return
   }

   const title = CurrentNews.content.columns.indexOf('title')
   const body = CurrentNews.content.columns.indexOf('body')
   const publishedAt = CurrentNews.content.columns.indexOf('published_at')

   const news = CurrentNews.content.data[0]

   return (
      <Suspense fallback={<CenterScreenLoader />}>
         <div className="animate-appearance">
            <div className="flex w-full flex-col items-center gap-14 text-center">
               <BackButton />
               <p
                  className={`w-full text-pretty text-lg ${raleway.className}`}
                  dangerouslySetInnerHTML={{ __html: news[title] }}
               ></p>
            </div>
            <ArrowSeparator />
            <span className="m-0 mb-3 flex w-full items-center justify-start gap-1 text-xs opacity-50">
               <FilePlusIcon />
               {ConvertDate(news[publishedAt] as string)}
            </span>
            <div
               className="styledNewsContent overflow-x-auto rounded-lg bg-neutral-200
          bg-opacity-20 p-3 text-sm shadow 768p:p-6 dark:bg-neutral-900 dark:bg-opacity-50"
               dangerouslySetInnerHTML={{
                  __html: news[body] as string,
               }}
            ></div>
         </div>
      </Suspense>
   )
}
