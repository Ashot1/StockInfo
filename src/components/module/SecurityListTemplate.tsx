import CustomPagination from '@/components/entity/CustomElements/CustomPagination'
import DefaultList from '@/components/ui/DefaultList/DefaultList'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { ReactNode } from 'react'
import Search, { TSearch } from '@/components/widgets/Search'
import FavoriteList from '@/components/widgets/FavoriteList'

export default async function SecurityListTemplate({
   startIndex,
   step,
   children,
   maxSize,
   url,
   dataLength,
}: {
   children: ReactNode
   startIndex: number
   step: number
   maxSize: number
   url: string
   dataLength: number
}) {
   return (
      <>
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
