'use client'

import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import { FC, useContext } from 'react'
import { Button } from '@/components/ui/ShadCN/button'
import { AuthContext } from '@/hoc/AuthProvider'
import { UpdateUserMainData } from '@/actions/Account/Account'
import { TFavoritesList } from '@/types/Auth.types'
import toast from 'react-hot-toast'

const AddToFavorite: FC<TFavoritesList & { className?: string }> = ({
   secID,
   image,
   type,
   className,
}) => {
   const context = useContext(AuthContext)
   const mainInfo = context.mainInfo
   const setMainInfo = context.setMainInfo

   const isFavorite = mainInfo?.favorites?.find((item) => item.secID == secID)
   const item = {
      image,
      secID,
      type,
   }

   const addToFavorite = async () => {
      if (isFavorite || !mainInfo?.favorites) return

      const { data, error } = await UpdateUserMainData({
         favorites: mainInfo ? [...mainInfo?.favorites, item] : [item],
      })

      if (error || !data) return toast.error(error || 'Ошибка добавления')

      if (setMainInfo && mainInfo)
         setMainInfo({ ...mainInfo, favorites: [...mainInfo?.favorites, item] })
   }

   const removeFromFavorite = async () => {
      if (!mainInfo?.favorites || mainInfo?.favorites.length < 0 || !isFavorite)
         return

      const newArr = mainInfo?.favorites.filter((item) => item.secID != secID)

      const { data, error } = await UpdateUserMainData({
         favorites: newArr,
      })

      if (error || !data) return toast.error(error || 'Ошибка добавления')

      if (setMainInfo) setMainInfo({ ...mainInfo, favorites: newArr })
   }

   return (
      <Button
         variant="ghost"
         className={className}
         onClick={isFavorite ? removeFromFavorite : addToFavorite}
      >
         {isFavorite ? (
            <BookmarkFilledIcon className="size-5" />
         ) : (
            <BookmarkIcon className="size-5" />
         )}
      </Button>
   )
}

export default AddToFavorite
