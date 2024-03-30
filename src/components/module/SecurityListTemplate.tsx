import CustomPagination from '@/components/entity/CustomElements/CustomPagination'
import DefaultList from '@/components/ui/DefaultList/DefaultList'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { ReactNode } from 'react'
import CustomModal from '@/components/entity/CustomElements/CustomModal'
import { BookmarkFilledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import CustomModalCommand from '@/components/entity/CustomElements/CustomModalCommand'
import Search, { TSearch } from '@/components/widgets/Search'

export default function SecurityListTemplate({
   startIndex,
   step,
   children,
   maxSize,
   url,
   dataLength,
   searchRequest,
   imgURL,
   imgType,
}: {
   children: ReactNode
   startIndex: number
   step: number
   maxSize: number
   url: string
   dataLength: number
} & Pick<TSearch, 'searchRequest' | 'imgURL' | 'imgType'>) {
   //      <BookmarkFilledIcon /> Избранное

   return (
      <>
         <div className="mb-10 flex items-center justify-center gap-6">
            <Search
               searchRequest={searchRequest}
               url={url}
               imgURL={imgURL}
               imgType={imgType}
            />
         </div>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={maxSize}
         />
         <DefaultList
            CurrentStartIndex={startIndex}
            Step={step}
            url={url}
            maxLength={maxSize}
         >
            {dataLength <= 0 && <EmptyListText text="Пусто" />}
            {children}
         </DefaultList>
         <CustomPagination
            currentStart={startIndex}
            element={'main'}
            maxSize={maxSize}
         />
      </>
   )
}
