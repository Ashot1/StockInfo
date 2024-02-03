import { FC, forwardRef, LegacyRef, memo, ReactNode } from 'react'
import { ModalContent, TProfileModalContent } from '@/types/Modals.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'
import InfoPlaceHolder from '@/components/ui/InfoPlaceHolder'

const MemoPlaceholder = memo(InfoPlaceHolder)

const ProfileDefaultModalContent: FC<ModalContent> = forwardRef(
   ({ avatar, UserInfo, className }, ref: LegacyRef<HTMLDivElement>) => {
      return (
         <div
            className={`overflow-y-auto ${className} custom-scroll`}
            ref={ref}
         >
            <aside className="w-full grid place-items-center mt-3">
               {avatar ? (
                  <Avatar className="size-14">
                     <AvatarImage src={avatar} />
                     <AvatarFallback>A</AvatarFallback>
                  </Avatar>
               ) : (
                  <PersonIcon className="size-12" />
               )}
            </aside>
            <section className="w-full px-4 flex flex-col gap-4 mt-5 mb-5">
               {UserInfo.map((item) => (
                  <MemoPlaceholder
                     key={item.Title}
                     title={item.Title}
                     text={item.Text || ''}
                  />
               ))}
            </section>
         </div>
      )
   }
)

ProfileDefaultModalContent.displayName = 'ProfileDefaultModalContent'

export default ProfileDefaultModalContent
