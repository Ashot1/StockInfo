import { FC, ForwardedRef, forwardRef, memo } from 'react'
import { ModalContent } from '@/types/Modals.types'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/ShadCN/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'
import { cn } from '@/utils/utils'
import ScrollBlock from '@/components/ui/HightOrder/ScrollBlock'

const MemoPlaceholder = memo(InfoPlaceHolder)

const ProfileDefaultModalContent: FC<ModalContent> = forwardRef(
   ({ avatar, UserInfo, className }, ref: ForwardedRef<HTMLDivElement>) => {
      return (
         <ScrollBlock
            className={cn(`custom-scroll overflow-y-auto`, className)}
            ref={ref}
         >
            <aside className="mt-3 grid w-full place-items-center">
               {avatar ? (
                  <Avatar className="size-20">
                     <AvatarImage src={avatar} />
                     <AvatarFallback>A</AvatarFallback>
                  </Avatar>
               ) : (
                  <PersonIcon className="size-12" />
               )}
            </aside>
            <section className="mb-5 mt-10 flex w-full flex-col gap-4 px-4 500p:px-24 768p:px-6">
               {UserInfo.map((item) => (
                  <MemoPlaceholder
                     key={item.Title}
                     title={item.Title}
                     text={item.Text || 'Пусто'}
                  />
               ))}
            </section>
         </ScrollBlock>
      )
   }
)

ProfileDefaultModalContent.displayName = 'ProfileDefaultModalContent'

export default ProfileDefaultModalContent
