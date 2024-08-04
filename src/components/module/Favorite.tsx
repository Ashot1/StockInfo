'use client'

import { FC, useState } from 'react'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import CustomSheet from '@/components/entity/CustomElements/CustomSheet'
import FadedButton from '@/components/ui/Buttons/FadedButton'
import { FavoritesListTypes } from '@/types/Auth.types'
import { SheetFooter } from '@/components/ui/ShadCN/sheet'
import EmptyListText from '@/components/ui/Lists/DefaultList/EmptyListText'
import { UpdateUserMainData } from '@/actions/Account/Account'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import toast from 'react-hot-toast'
import ScrollBlock from '@/components/ui/HightOrder/ScrollBlock'
import FavoriteDefaultModalContent from '@/components/entity/ModalsContent/Favorite/FavoriteDefaultModalContent'
import FavoriteButtons from '@/components/entity/ModalsContent/Favorite/FavoriteButtons'
import { FetchFavorites } from '@/actions/Account/Client'
import { DefaultListLoading } from '@/components/ui/Lists/DefaultList/DefaultList'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/utils/config'

export type TFormatedFavoriteList = {
   SECID: string
   SHORTNAME: string
   SECNAME?: string
   type: FavoritesListTypes
   image: string
   price?: number
   definition?: number
}

const Favorite: FC = () => {
   const [EditMode, setEditMode] = useState(false)
   const context = useAuthContext()
   const mainInfo = context.mainInfo
   const setMainInfo = context.setMainInfo

   const {
      data: FavList,
      error,
      isLoading,
   } = useQuery({
      queryKey: [queryKeys.Favorite],
      queryFn: () => FetchFavorites(mainInfo?.favorites),
      select: ({ data }) => data,
      retry: 2,
      staleTime: Infinity,
   })

   const queryClient = useQueryClient()

   const clearAll = useMutation({
      mutationFn: async () => {
         const { data, error } = await UpdateUserMainData({
            favorites: [],
         })

         if (!data || error) throw new Error(error || 'Не удалось очистить')

         return data
      },
      onError: (err) => toast.error(err.message),
      onSuccess: async () => {
         if (setMainInfo && mainInfo)
            setMainInfo({ ...mainInfo, favorites: [] })

         await queryClient.setQueryData([queryKeys.Favorite], { data: [] })
      },
   })

   const deleteFavoriteItem = useMutation({
      mutationFn: async (id: string) => {
         if (!FavList) return

         const formatedList = FavList.filter((item) => item.SECID !== id)

         const { data, error } = await UpdateUserMainData({
            favorites: formatedList.map((item) => ({
               type: item.type,
               secID: item.SECID,
               image: item.image,
            })),
         })

         if (!data || error) throw new Error(error || 'Ошибка получения данных')

         return { formatedList, data }
      },
      onError: (err) => toast.error(err.message),
      onSuccess: async (props) => {
         if (!setMainInfo || !mainInfo || !props?.data || !props?.formatedList)
            return

         setMainInfo({ transactions: mainInfo.transactions, ...props.data })

         await queryClient.setQueryData([queryKeys.Favorite], {
            data: props.formatedList,
         })
      },
   })

   const emptyCondition = FavList && FavList.length > 0 && !isLoading

   return (
      <CustomSheet
         hotKey={{ ctrl: true, shift: false, code: 'KeyY' }}
         TriggerText={
            <FadedButton anotherElement>
               <BookmarkFilledIcon /> Избранное
               <kbd className="hidden text-[0.7rem] tracking-tighter opacity-50 500p:block">
                  Ctrl + y
               </kbd>
            </FadedButton>
         }
         Title="Избранное"
         className="min-w-[90dvw] px-2 500p:min-w-[40dvw] 768p:px-6"
         Description="Ваши избранные инструменты для быстрого доступа и отслеживания"
      >
         {isLoading ? <DefaultListLoading len={4} /> : null}
         {FavList?.length ? (
            <ScrollBlock
               direction="vertical"
               className="mt-10 grid max-h-[60dvh] min-h-[30%] grid-cols-1 gap-4"
            >
               <FavoriteDefaultModalContent
                  deleteFavoriteItem={(id: string) =>
                     deleteFavoriteItem.mutate(id)
                  }
                  FavList={FavList}
                  EditMode={EditMode}
               />
            </ScrollBlock>
         ) : null}
         {emptyCondition ? (
            <SheetFooter className="mt-10 gap-6">
               <FavoriteButtons
                  EditMode={EditMode}
                  changeEditMode={() => setEditMode((prev) => !prev)}
                  clearAll={() => clearAll.mutate()}
               />
            </SheetFooter>
         ) : (
            <EmptyListText
               className="mt-24"
               text={'Вы еще ничего не добавили'}
            />
         )}
         {error && <ErrorMessage errMessage={error.message} />}
      </CustomSheet>
   )
}

export default Favorite
