'use client'

import { FC, useCallback, useContext, useState } from 'react'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import CustomSheet from '@/components/entity/CustomElements/CustomSheet'
import FadedButton from '@/components/ui/FadedButton'
import { TFavoritesList, FavoritesListTypes } from '@/types/Auth.types'
import { SheetFooter } from '@/components/ui/ShadCN/sheet'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { UpdateUserMainData } from '@/actions/Account/Account'
import { AuthContext } from '@/hoc/AuthProvider'
import toast from 'react-hot-toast'
import ScrollBlock from '@/components/ui/ScrollBlock'
import FavoriteDefaultModalContent from '@/components/entity/ModalsContent/Favorite/FavoriteDefaultModalContent'
import FavoriteButtons from '@/components/entity/ModalsContent/Favorite/FavoriteButtons'
import { FetchFavorites } from '@/actions/Account/Client'
import { useQuery } from '@/hooks/Query'
import { DefaultListLoading } from '@/components/ui/DefaultList/DefaultList'
import ErrorMessage from '@/components/ui/ErrorMessage'

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
   const context = useContext(AuthContext)
   const mainInfo = context.mainInfo
   const setMainInfo = context.setMainInfo
   const {
      data: FavList,
      error,
      loading,
   } = useQuery<TFormatedFavoriteList[], TFormatedFavoriteList[]>({
      queryFn: useCallback(
         () => FetchFavorites(mainInfo?.favorites),
         [mainInfo?.favorites]
      ),
   })

   const clearAll = async () => {
      const { data, error } = await UpdateUserMainData({
         favorites: [],
      })

      if (!data || error) return toast.error(error || 'Не удалось очистить')

      if (setMainInfo && mainInfo) setMainInfo({ ...mainInfo, favorites: [] })
   }

   const deleteFavoriteItem = async (id: string) => {
      if (!FavList) return

      const formatedList: TFavoritesList[] = []

      FavList.forEach((item) => {
         if (item.SECID != id)
            formatedList.push({
               type: item.type,
               secID: item.SECID,
               image: item.image,
            })
      })
      const { data, error } = await UpdateUserMainData({
         favorites: formatedList,
      })

      if (!data || error) return toast.error(error || 'Ошибка получения данных')

      if (setMainInfo && mainInfo)
         setMainInfo({ ...mainInfo, favorites: formatedList })
   }

   const emptyCondition = FavList && FavList.length > 0 && !loading

   return (
      <CustomSheet
         hotKey={{ ctrl: true, shift: false, key: 'y' }}
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
      >
         {loading && <DefaultListLoading len={4} />}
         {FavList?.length ? (
            <ScrollBlock
               direction="vertical"
               className="mt-10 grid max-h-[60dvh] min-h-[30%] grid-cols-1 gap-4"
            >
               <FavoriteDefaultModalContent
                  deleteFavoriteItem={deleteFavoriteItem}
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
                  clearAll={clearAll}
               />
            </SheetFooter>
         ) : (
            <EmptyListText
               className="mt-24"
               text={'Вы еще ничего не добавили'}
            />
         )}
         {error && <ErrorMessage errMessage={error} />}
      </CustomSheet>
   )
}

export default Favorite
