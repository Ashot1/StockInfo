import { URLList } from '@/utils/config'
import { raleway } from '@/utils/fonts'
import ArrowSeparator from '@/components/ui/ArrowSeparator'
import { redirect } from 'next/navigation'
import { ConvertDate } from '@/utils/Date'
import { FilePlusIcon } from '@radix-ui/react-icons'
import { getCurrentNews } from '@/actions/Security/News'
import SwipeNavigator from '@/hoc/SwipeNavigator'
import AddToFavorite from '@/components/entity/Buttons/AddToFavorite'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { id: string } }) {
   const { data: resJSON, error } = await getCurrentNews(params.id)
   if (!resJSON || error)
      return {
         title: 'Новость с московской биржи',
         authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
         robots: {
            index: true,
            follow: true,
            googleBot: { follow: true, index: true },
         },
         openGraph: {
            title: 'Новость с московской биржи',
            authors: 'Московская биржа',
            url: `${process.env.NEXT_PUBLIC_SITEURL}/news/${params.id}`,
            images: '/Preview.png',
         },
         twitter: {
            title: 'Новость с московской биржи',
            images: '/Preview.png',
         },
      }
   const title = resJSON[1].content[0].title

   return {
      title,
      description: 'Новость с московской биржи',
      authors: { name: 'Московская биржа', url: 'https://www.moex.com/' },
      robots: {
         index: true,
         follow: true,
         googleBot: { follow: true, index: true },
      },
      openGraph: {
         title,
         description: 'Новость с московской биржи',
         authors: 'Московская биржа',
         url: `${process.env.NEXT_PUBLIC_SITEURL}/news/${params.id}`,
         images: '/Preview.png',
      },
      twitter: {
         title,
         description: 'Новость с московской биржи',
         images: '/Preview.png',
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
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <AddToFavorite
               secID={id}
               type="News"
               className="mt-5"
               image={'/Menu/Shortcuts/News.png'}
            />
            <ArrowSeparator />
         </SwipeNavigator>
         <span
            className="m-0 mb-3 flex w-full items-center justify-start gap-1 text-xs opacity-50"
            aria-label="Дата написания"
         >
            <FilePlusIcon />
            {ConvertDate(publishedAt)}
         </span>
         <div
            aria-label="Содержимое новости"
            className="styledNewsContent overflow-x-auto rounded-lg bg-neutral-200 bg-opacity-20 p-3 text-sm shadow dark:bg-neutral-900 dark:bg-opacity-50 768p:p-6"
            dangerouslySetInnerHTML={{
               __html: body,
            }}
         ></div>
      </>
   )
}
