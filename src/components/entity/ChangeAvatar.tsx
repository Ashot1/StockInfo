'use client'

import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PersonIcon } from '@radix-ui/react-icons'

const ChangeAvatar: FC<{
   AvatarURL: string | undefined
   ChooseAvClick: () => void
}> = ({ AvatarURL, ChooseAvClick }) => {
   return (
      <div className="grid w-full place-items-center mb-10 mt-10">
         {AvatarURL ? (
            <Avatar
               onClick={ChooseAvClick}
               className="size-20 border-[var(--Main)] rounded-full cursor-pointer avatarChangeHover"
            >
               <AvatarImage src={AvatarURL} className="rounded-full" />
               <AvatarFallback>A</AvatarFallback>
            </Avatar>
         ) : (
            <div
               onClick={ChooseAvClick}
               className="size-20 border-2 border-[var(--Main)] rounded-full p-3 grid place-items-center opacity-90 cursor-pointer avatarChangeHover"
            >
               <PersonIcon className="w-full h-full" />
            </div>
         )}
      </div>
   )
}

export default ChangeAvatar
