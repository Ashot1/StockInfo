'use client'

import { Button } from '@/components/ui/ShadCN/button'
import { Dispatch, FC, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileModeState } from '@/types/Modals.types'
import { DeleteUser } from '@/actions/Account/Account'
import { SignOut } from '@/actions/Account/Auth'
import toast from 'react-hot-toast'

const ProfileButtons: FC<{
   setMode: Dispatch<SetStateAction<ProfileModeState>>
}> = ({ setMode }) => {
   const { refresh } = useRouter()

   // выход из аккаунта
   const QuitAccount = async () => {
      const { error } = await SignOut()
      if (error) return { error }

      refresh()

      return {}
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
