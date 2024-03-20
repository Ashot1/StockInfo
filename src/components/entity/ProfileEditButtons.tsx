'use client'

import { Dispatch, FC, SetStateAction } from 'react'
import { ProfileModeState } from '@/types/Modals.types'
import { Button } from '@/components/ui/ShadCN/button'

const ProfileEditButtons: FC<{
   setMode: Dispatch<SetStateAction<ProfileModeState>>
}> = ({ setMode }) => {
   // возвращение на главную
   const BackToMain = () => setMode({ name: 'default' })

   return (
      <>
         <Button variant="default" onClick={BackToMain}>
            Назад
         </Button>
      </>
   )
}

export default ProfileEditButtons
