import { Pencil1Icon, FilePlusIcon } from '@radix-ui/react-icons'
import { bellota, nunito } from '@/utils/fonts'
import Link from 'next/link'
import { FC } from 'react'
import { ConvertDate } from '@/utils/ConvertDate'
import { cn } from '@/utils/utils'
import { Skeleton } from '@/components/ui/ShadCN/skeleton'

export interface INewsListItem {
   Title: string
   createdAt: string
   editedAt?: string
   index?: number
   link: string
   ClassName?: string
}

export default function NewsListItem({
   editedAt,
   Title,
   index,
   createdAt,
   link,
   ClassName,
}: INewsListItem) {
   return (
      <Link
         href={link}
         className={cn(
            `mt-2 grid min-h-64 cursor-pointer
        grid-rows-[0.5fr_1.6fr] border-b border-[var(--grayBG)] py-5 transition-all duration-300 hover:rounded-xl
        hover:bg-[var(--grayBG)] 300p:min-h-48 500p:min-h-44 768p:min-h-32 768p:grid-cols-[0.2fr_1.8fr] 768p:grid-rows-1`,
            ClassName
         )}
      >
         <DisplayIndex index={index} />
         <div className="flex flex-col justify-between gap-6 px-1">
            <p
               className={`text-pretty text-center text-sm 768p:text-wrap 768p:text-left 768p:text-base ${nunito.className}`}
               dangerouslySetInnerHTML={{ __html: Title }}
            ></p>
            <DisplayDate createdAt={createdAt} editedAt={editedAt} />
         </div>
      </Link>
   )
}

const DisplayDate: FC<Pick<INewsListItem, 'createdAt' | 'editedAt'>> = ({
   createdAt,
   editedAt,
}) => {
   return (
      <span className="flex w-full justify-center gap-4 text-xs opacity-50 768p:justify-start">
         <p className="flex items-center gap-2 text-center">
            <FilePlusIcon />
            {ConvertDate(createdAt)}
         </p>
         {editedAt && (
            <p className="flex items-center gap-2 text-center">
               <Pencil1Icon />
               {ConvertDate(editedAt)}
            </p>
         )}
      </span>
   )
}

const DisplayIndex: FC<Pick<INewsListItem, 'index'>> = ({ index }) => {
   if (index)
      return (
         <span
            className={`flex justify-center text-xl 768p:items-center ${bellota.className}`}
         >
            {index < 10 ? '0' : ''}
            {index}.
         </span>
      )
}

export const NewsListItemLoader: FC<{ className?: string }> = ({
   className,
}) => {
   return (
      <div
         className={cn(
            `mt-2 grid min-h-64 grid-rows-[0.5fr_1.6fr]
         border-b border-[var(--grayBG)] py-5 transition-all duration-300
         300p:min-h-48 500p:min-h-44 768p:min-h-32 768p:grid-cols-[0.2fr_1.8fr] 768p:grid-rows-1`,
            className
         )}
      >
         <div className="flex justify-center text-xl 768p:items-center">
            <Skeleton className="h-4 w-8" />
         </div>
         <div className="flex flex-col items-center justify-between gap-6 px-1 768p:items-start">
            <Skeleton className="h-10 w-[50%]" />
            <Skeleton className="h-2 w-[30%]" />
         </div>
      </div>
   )
}
