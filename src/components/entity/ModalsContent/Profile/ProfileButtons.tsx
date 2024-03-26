'use client'

import { Button } from '@/components/ui/ShadCN/button'
import { supabase } from '@/utils/Supabase.init'
import { Dispatch, FC, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileModeState } from '@/types/Modals.types'
import { DeleteUser } from '@/actions/Account'
import TryCatch from '@/utils/TryCatch'

const ProfileButtons: FC<{
   setMode: Dispatch<SetStateAction<ProfileModeState>>
}> = ({ setMode }) => {
   const { refresh } = useRouter()

   // выход из аккаунта
   const QuitAccount = async () => {
      return TryCatch(async () => {
         const { error } = await supabase.auth.signOut({ scope: 'local' })
         if (error) throw error
         refresh()
         return { data: undefined }
      })
   }

   const QuitClick = () =>
      setMode({
         name: 'confirm',
         BackFunction: BackToMain,
         Title: 'Выход',
         Description: 'Вы уверены, что хотите выйти из аккаунта?',
         CallbackText: 'Выйти',
         action: QuitAccount,
      })

   // удаление аккаунта
   const DeleteAccount = async () => {
      const { error } = await DeleteUser()
      if (error) return { error: error }
      refresh()
      return {}
   }

   const DelClick = () =>
      setMode({
         name: 'confirm',
         BackFunction: BackToMain,
         CallbackText: 'Удалить',
         action: DeleteAccount,
         Description:
            'Вы уверены, что хотите удалить свой аккаунт? Отменить действие будет невозможно',
         Title: 'Удаление',
      })

   // режим редактирования
   const EditClick = () => setMode({ name: 'edit' })

   // возвращение на главную
   const BackToMain = () => setMode({ name: 'default' })

   return (
      <>
         <Button variant="outline" onClick={EditClick}>
            Изменить
         </Button>
         <Button variant="secondary" onClick={QuitClick}>
            Выйти
         </Button>
         <Button variant="destructive" onClick={DelClick}>
            Удалить
         </Button>
      </>
   )
}

export default ProfileButtons
