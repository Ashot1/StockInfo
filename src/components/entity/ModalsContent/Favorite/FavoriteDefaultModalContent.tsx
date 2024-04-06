'use client'

import { FC, memo } from 'react'
import { TFormatedFavoriteList } from '@/components/widgets/FavoriteList'
import { URLList } from '@/utils/const'
import { FavoritesListTypes } from '@/types/Auth.types'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/ShadCN/button'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { DividerHorizontalIcon } from '@radix-ui/react-icons'

const FavoriteDefaultModalContent: FC<{
   FavList: TFormatedFavoriteList[]
   EditMode: boolean
   deleteFavoriteItem: (secID: string) => void
}> = ({ FavList, EditMode, deleteFavoriteItem }) => {
   const MotionButton = motion(Button)
   const MemoListItem = memo(DefaultListItem)

   return FavList.map((item) => {
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
               defaultSRC={`/Menu/Shortcuts/${item.type}.png`}
               url={url[item.type]}
               img={img[item.type]}
               text={item.SHORTNAME}
               subtext={item.type === 'News' ? item.SECNAME : item.SECID}
               rightText={item.price}
               rightSubtext={
                  item.definition && parseFloat(item.definition.toFixed(3))
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
   })
}

export default FavoriteDefaultModalContent
