'use client'
import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMatchMedia } from '@/hooks/MatchMedia'
import { Button } from '@/components/ui/ShadCN/button'

const FavoriteButtons: FC<{
   EditMode: boolean
   clearAll: () => void
   changeEditMode: () => void
}> = ({ EditMode, clearAll, changeEditMode }) => {
   const isMobile = useMatchMedia(640)

   const MotionButton = motion(Button)

   return (
      <>
         <AnimatePresence>
            {EditMode && (
               <MotionButton
                  initial={{
                     y: isMobile ? -35 : 0,
                     x: isMobile ? 0 : 35,
                     opacity: 0,
                  }}
                  animate={{ y: 0, x: 0, opacity: 1 }}
                  exit={{
                     y: isMobile ? -20 : 0,
                     x: isMobile ? 0 : 20,
                     opacity: 0,
                  }}
                  variant="destructive"
                  onClick={clearAll}
               >
                  Очистить
               </MotionButton>
            )}
         </AnimatePresence>
         <Button
            variant={EditMode ? 'outline' : 'default'}
            onClick={changeEditMode}
         >
            Изменить
         </Button>
      </>
   )
}

export default FavoriteButtons
