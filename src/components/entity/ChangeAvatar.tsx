'use client'

import { FC } from 'react'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/ShadCN/avatar'
import { PersonIcon } from '@radix-ui/react-icons'

const ChangeAvatar: FC<{
   AvatarURL: string | undefined
   ChooseAvClick: () => void
}> = ({ AvatarURL, ChooseAvClick }) => {
   return (
      <div className="mb-10 mt-10 grid w-full place-items-center">
         {AvatarURL ? (
            <Avatar
               onClick={ChooseAvClick}
               className="avatarChangeHover size-20 cursor-pointer rounded-full border-[var(--Main)]"
            >
               <AvatarImage src={AvatarURL} className="rounded-full" />
               <AvatarFallback>A</AvatarFallback>
            </Avatar>
         ) : (
            <div
               onClick={ChooseAvClick}
               className="avatarChangeHover grid size-20 cursor-pointer place-items-center rounded-full border-2 border-[var(--Main)] p-3 opacity-90"
            >
               <PersonIcon className="h-full w-full" />
            </div>
         )}
      </div>
   )
}

export default ChangeAvatar
