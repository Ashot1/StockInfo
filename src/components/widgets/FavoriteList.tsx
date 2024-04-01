'use client'

import { FC, memo, useContext, useEffect, useState } from 'react'
import {
   BookmarkFilledIcon,
   DividerHorizontalIcon,
} from '@radix-ui/react-icons'
import CustomSheet from '@/components/entity/CustomElements/CustomSheet'
import FadedButton from '@/components/ui/FadedButton'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { TFavoritesList, FavoritesListTypes } from '@/types/Auth.types'
import { URLList } from '@/utils/const'
import { Button } from '@/components/ui/ShadCN/button'
import { SheetFooter } from '@/components/ui/ShadCN/sheet'
import { AnimatePresence, motion } from 'framer-motion'
import EmptyListText from '@/components/ui/DefaultList/EmptyListText'
import { FetchFavorites, UpdateUserMainData } from '@/actions/Account/Account'
import { AuthContext } from '@/hoc/AuthProvider'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export type TFormatedFavoriteList = {
   SECID: string
   SHORTNAME: string
   type: FavoritesListTypes
   image: string
   price?: number
   definition?: number
}

const FavoriteList: FC = () => {
   const [EditMode, setEditMode] = useState(false)
   const context = useContext(AuthContext)
   const mainInfo = context.mainInfo
   const setMainInfo = context.setMainInfo
   const [FavList, setFavList] = useState<TFormatedFavoriteList[] | undefined>(
      undefined
   )

   const MotionButton = motion(Button)
   const MemoListItem = memo(DefaultListItem)

   const fetchFavorites = (arr: TFavoritesList[]) => {
      FetchFavorites(arr).then(({ data, error }) => {
         if (error || !data)
            return toast.error(error || 'Ошибка получения избранного')
         setFavList(data)
      })
   }

   useEffect(() => {
      if (!mainInfo?.favorites) return

      fetchFavorites(mainInfo.favorites)
   }, [mainInfo?.favorites])

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

   const clearAll = async () => {
      const { data, error } = await UpdateUserMainData({
         favorites: [],
      })

      if (!data || error) return toast.error(error || 'Не удалось очистить')

      if (setMainInfo && mainInfo) setMainInfo({ ...mainInfo, favorites: [] })
   }

   return (
      <CustomSheet
         hotKey={{ ctrl: true, shift: false, key: 'y' }}
         TriggerText={
            <FadedButton anotherElement>
               <BookmarkFilledIcon /> Избранное
               <kbd className="hidden text-[0.7rem] tracking-tighter opacity-50 300p:block">
                  Ctrl + y
               </kbd>
            </FadedButton>
         }
         Title="Избранное"
         className="min-w-[90dvw] px-2 500p:min-w-[40dvw] 768p:px-6"
      >
         <div className="custom-scroll mt-10 grid max-h-[60dvh] min-h-[30%] grid-cols-1 gap-4 overflow-x-hidden overflow-y-scroll">
            {FavList &&
               FavList.map((item) => {
                  const img: { [key in FavoritesListTypes]: string } = {
                     Stock: `${URLList.logos_stock}/${item.image}.svg`,
                     Bond: `${URLList.logos_bonds}/${item.image}.png`,
                     News: item.image,
                     Currency: '',
                  }
                  const url: { [key in FavoritesListTypes]: string } = {
                     Bond: `${URLList.current_bond}/${item.SECID}`,
                     Stock: `${URLList.current_stock}/${item.SECID}`,
                     News: `${URLList.current_news}/${item.SECID}`,
                     Currency: `${URLList.current_currency}/${item.SECID}`,
                  }

                  return (
                     <div className="flex items-center gap-2" key={item.SECID}>
                        <MemoListItem
                           url={url[item.type]}
                           img={img[item.type]}
                           text={item.SHORTNAME}
                           subtext={item.SECID}
                           rightText={item.price}
                           rightSubtext={
                              item.definition &&
                              parseFloat(item.definition.toFixed(3))
                           }
                           className="flex-1 px-2 duration-300 300p:px-4"
                        />
                        <AnimatePresence>
                           {EditMode && (
                              <MotionButton
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                                 exit={{ scale: 0 }}
                                 variant="ghost"
                                 onClick={() => deleteFavoriteItem(item.SECID)}
                              >
                                 <DividerHorizontalIcon />
                              </MotionButton>
                           )}
                        </AnimatePresence>
                     </div>
                  )
               })}
         </div>
         {FavList && FavList.length > 0 ? (
            <SheetFooter className="mt-10 gap-2">
               <Button variant="destructive" onClick={clearAll}>
                  Очистить
               </Button>
               <Button
                  variant={EditMode ? 'outline' : 'default'}
                  onClick={() => setEditMode((prev) => !prev)}
               >
                  Изменить
               </Button>
            </SheetFooter>
         ) : (
            <EmptyListText text={'Вы еще ничего не добавили'} />
         )}
      </CustomSheet>
   )
}

export default FavoriteList
