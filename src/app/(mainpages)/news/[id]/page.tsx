import { URLList } from '@/utils/const'
import { raleway } from '@/utils/fonts'
import ArrowSeparator from '@/components/ui/ArrowSeparator'
import { redirect } from 'next/navigation'
import { ConvertDate } from '@/utils/ConvertDate'
import { FilePlusIcon } from '@radix-ui/react-icons'
import { getCurrentNews } from '@/actions/News'
import ControlPanel from '@/components/widgets/ControlPanel'
import SwipeNavigator from '@/hoc/SwipeNavigator'

export async function generateMetadata({ params }: { params: { id: string } }) {
   const { data: resJSON, error } = await getCurrentNews(params.id)
   if (!resJSON || error)
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
      title,
      description: 'Новость с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      openGraph: {
         title,
         description: 'Новость с московской биржи',
         authors: 'Московская биржа',
      },
      twitter: {
         title,
         description: 'Новость с московской биржи',
      },
   }
}

export default async function SpecificNews({
   params: { id },
}: {
   params: { id: string }
}) {
   return (
      <div className="animate-appearance">
         <ControlPanel />
         <MainContent id={id} />
      </div>
   )
}

const MainContent = async ({ id }: { id: string }) => {
   const { data: CurrentNews, error } = await getCurrentNews(id)

   if (!CurrentNews || error || !CurrentNews.content.data[0])
      return redirect(URLList.notFound)

   const title = CurrentNews.content.columns.indexOf('title')
   const body = CurrentNews.content.columns.indexOf('body')
   const publishedAt = CurrentNews.content.columns.indexOf('published_at')

   const news = CurrentNews.content.data[0]

   return (
      <>
         <SwipeNavigator
            prev="RouterBack"
            className={`w-full text-pretty text-center text-lg ${raleway.className}`}
         >
            <p dangerouslySetInnerHTML={{ __html: news[title] }}></p>
            <ArrowSeparator />
         </SwipeNavigator>
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
      </>
   )
}
