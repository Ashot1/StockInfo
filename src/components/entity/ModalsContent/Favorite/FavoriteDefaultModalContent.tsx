'use client'

import { FC, memo } from 'react'
import { TFormatedFavoriteList } from '@/components/widgets/Favorite'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/ShadCN/button'
import DefaultListItem from '@/components/ui/DefaultList/DefaultListItem'
import { DividerHorizontalIcon } from '@radix-ui/react-icons'
import { DataByType } from '@/utils/dataByType'

const FavoriteDefaultModalContent: FC<{
   FavList: TFormatedFavoriteList[]
   EditMode: boolean
   deleteFavoriteItem: (secID: string) => void
}> = ({ FavList, EditMode, deleteFavoriteItem }) => {
   const MotionButton = motion(Button)
   const MemoListItem = memo(DefaultListItem)

   return FavList.map((item) => {
      const { img, url } = DataByType({
         imgSRC: item.image,
         SECID: item.SECID,
      })

      return (
         <div className="flex items-center gap-2" key={item.SECID}>
            <MemoListItem
               defaultIMG={`/Menu/Shortcuts/${item.type}.png`}
               url={url[item.type]}
               img={img[item.type]}
               text={item.SHORTNAME}
               subtext={item.type === 'News' ? item.SECNAME : item.SECID}
               rightText={`${item.price} ₽`}
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
