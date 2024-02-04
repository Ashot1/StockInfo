import { FC, forwardRef, LegacyRef, memo, ReactNode } from 'react'
import { ModalContent, TProfileModalContent } from '@/types/Modals.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'
import { cn } from '@/utils/utils'

const MemoPlaceholder = memo(InfoPlaceHolder)

const ProfileDefaultModalContent: FC<ModalContent> = forwardRef(
   ({ avatar, UserInfo, className }, ref: LegacyRef<HTMLDivElement>) => {
      return (
         <div
            className={cn(`overflow-y-auto custom-scroll`, className)}
            ref={ref}
         >
            <aside className="w-full grid place-items-center mt-3">
               {avatar ? (
                  <Avatar className="size-20">
                     <AvatarImage src={avatar} />
                     <AvatarFallback>A</AvatarFallback>
                  </Avatar>
               ) : (
                  <PersonIcon className="size-12" />
               )}
            </aside>
            <section className="w-full px-4 500p:px-24 768p:px-6 flex flex-col gap-4 mt-10 mb-5">
               {UserInfo.map((item) => (
                  <MemoPlaceholder
                     key={item.Title}
                     title={item.Title}
                     text={item.Text || 'Пусто'}
                  />
               ))}
            </section>
         </div>
      )
   }
)

ProfileDefaultModalContent.displayName = 'ProfileDefaultModalContent'

export default ProfileDefaultModalContent
