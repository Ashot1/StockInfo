'use client'

import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { Button } from '@/components/ui/ShadCN/button'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { UpdateUserMainData } from '@/actions/Account/Account'
import { TFavoritesList } from '@/types/Auth.types'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/utils/config'

const AddToFavorite: FC<TFavoritesList & { className?: string }> = ({
   secID,
   image,
   type,
   className,
}) => {
   const context = useAuthContext()
   const mainInfo = context.mainInfo
   const setMainInfo = context.setMainInfo
   const queryClient = useQueryClient()

   const isFavorite = mainInfo?.favorites?.find((item) => item.secID == secID)
   const item = {
      image,
      secID,
      type,
   }

   const addToFavorite = useMutation({
      mutationFn: async () => {
         if (isFavorite || !mainInfo?.favorites) return

         const { data, error } = await UpdateUserMainData({
            favorites: mainInfo ? [...mainInfo.favorites, item] : [item],
         })

         if (error || !data) throw error || new Error('Ошибка добавления')
      },
      onError: (error) => toast.error(error.message),
      onSuccess: async () => {
         if (!setMainInfo || !mainInfo?.favorites) return

         setMainInfo({
            ...mainInfo,
            favorites: [...mainInfo.favorites, item],
         })

         await queryClient.invalidateQueries({ queryKey: [queryKeys.Favorite] })
      },
   })

   const removeFromFavorite = useMutation({
      mutationFn: async () => {
         if (
            !mainInfo?.favorites ||
            mainInfo?.favorites.length < 0 ||
            !isFavorite
         )
            return

         const newArr = mainInfo.favorites.filter((item) => item.secID != secID)

         const { data, error } = await UpdateUserMainData({
            favorites: newArr,
         })
         if (error || !data) throw new Error(error || 'Ошибка удаления')

         if (setMainInfo) setMainInfo({ ...mainInfo, favorites: newArr })

         await queryClient.invalidateQueries({ queryKey: [queryKeys.Favorite] })
      },
      onError: (error) => toast.error(error.message),
   })

   return (
      <Button
         aria-label="Добавить в избранное"
         variant="ghost"
         className={className}
         onClick={() =>
            isFavorite ? removeFromFavorite.mutate() : addToFavorite.mutate()
         }
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
