import { FC, ForwardedRef, forwardRef, memo } from 'react'
import { ModalContent } from '@/types/Modals.types'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/ShadCN/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'
import ScrollBlock from '@/components/ui/HightOrder/ScrollBlock'
import { MotionProps } from 'framer-motion'

const MemoPlaceholder = memo(InfoPlaceHolder)

const ProfileDefaultModalContent = forwardRef<
   HTMLDivElement,
   ModalContent & MotionProps
>(({ avatar, UserInfo, className, ...MotionProps }, ref) => {
   return (
      <ScrollBlock
         direction="vertical"
         className={className}
         ref={ref}
         {...MotionProps}
      >
         <div className="mt-3 grid w-full place-items-center">
            {avatar ? (
               <Avatar className="size-20" aria-label="Аватарка пользователя">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>A</AvatarFallback>
               </Avatar>
            ) : (
               <PersonIcon
                  className="size-12"
                  aria-label="Иконка пользователя"
               />
            )}
         </div>
         <section className="mb-5 mt-10 flex w-full flex-col gap-4 px-4 500p:px-24 768p:px-6">
            {UserInfo.map((item) => (
               <MemoPlaceholder
                  key={item.Title}
                  title={item.Title}
                  text={item.Text || 'Пусто'}
                  titleClassName="capitalize"
               />
            ))}
         </section>
      </ScrollBlock>
   )
})

ProfileDefaultModalContent.displayName = 'ProfileDefaultModalContent'

export default ProfileDefaultModalContent
