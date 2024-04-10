import { URLList } from '@/utils/const'
import { raleway } from '@/utils/fonts'
import ArrowSeparator from '@/components/ui/ArrowSeparator'
import { redirect } from 'next/navigation'
import { ConvertDate } from '@/utils/ConvertDate'
import { FilePlusIcon } from '@radix-ui/react-icons'
import { getCurrentNews } from '@/actions/News'
import ControlPanel from '@/components/module/ControlPanel'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import AddToFavorite from '@/components/entity/AddToFavorite'

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
   const title = resJSON[1].content[0].title

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
         <MainContent id={id} />
      </div>
   )
}

const MainContent = async ({ id }: { id: string }) => {
   const { data: CurrentNews, error } = await getCurrentNews(id)

   if (!CurrentNews || error) return redirect(URLList.notFound)

   const News = CurrentNews[1].content[0]
   const title = News.title
   const body = News.body
   const publishedAt = News.published_at

   return (
      <>
         <SwipeNavigator
            prev="RouterBack"
            className={`w-full text-pretty text-center text-lg ${raleway.className}`}
         >
            <p dangerouslySetInnerHTML={{ __html: title }}></p>
            <AddToFavorite
               secID={id}
               type="News"
               image={'/Menu/Shortcuts/News.png'}
            />
            <ArrowSeparator />
         </SwipeNavigator>
         <span className="m-0 mb-3 flex w-full items-center justify-start gap-1 text-xs opacity-50">
            <FilePlusIcon />
            {ConvertDate(publishedAt)}
         </span>
         <div
            className="styledNewsContent overflow-x-auto rounded-lg bg-neutral-200
          bg-opacity-20 p-3 text-sm shadow 768p:p-6 dark:bg-neutral-900 dark:bg-opacity-50"
            dangerouslySetInnerHTML={{
               __html: body,
            }}
         ></div>
      </>
   )
}
