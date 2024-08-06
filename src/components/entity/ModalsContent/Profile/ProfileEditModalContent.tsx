'use client'

import {
   ChangeEvent,
   FC,
   forwardRef,
   LegacyRef,
   MouseEvent,
   useRef,
   useState,
} from 'react'
import { ProfileModeEdit, UserProfileInfo } from '@/types/Modals.types'
import { cn } from '@/utils/utils'
import StyledInput from '@/components/ui/Inputs/StyledInput'
import { Button } from '@/components/ui/ShadCN/button'
import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { AuthFormPatterns } from '@/utils/config'
import { ReloadIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'
import ChangeAvatar from '@/components/entity/ChangeAvatar'
import { UpdateUser } from '@/actions/Account/Account'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import { SupabaseCustomClient } from '@/utils/supabase/client'

export type EditableInputs = { avatar?: FileList } & {
   [key in UserProfileInfo['Value']]: UserProfileInfo['Editable'] extends true
      ? string
      : never
}

const ProfileEditModalContent: FC<ProfileModeEdit> = forwardRef(
   ({ Info, className, avatar }, ref: LegacyRef<HTMLDivElement>) => {
      const {
         handleSubmit,
         register,
         formState: { errors, isValid, isSubmitting },
         reset,
      } = useForm<EditableInputs>({ mode: 'all' })

      const [AvatarURL, setAvatarURL] = useState<string | undefined>(avatar)
      const InputFileRef = useRef<HTMLInputElement | null>(null)
      const context = useAuthContext()
      const setUser = context.setAuthInfo

      // сохранение изменений
      const Submit: SubmitHandler<EditableInputs> = async (data) => {
         const supabase = SupabaseCustomClient()

         if (data.avatar?.length) {
            const extension = data.avatar[0].name.split('.').at(-1)

            const { data: UploadData, error: UploadError } =
               await supabase.storage
                  .from('Avatars')
                  .upload(
                     `public/${context.authInfo.id}.${extension}`,
                     data.avatar[0],
                     {
                        upsert: true,
                     }
                  )
            if (UploadError) toast.error('Не удалось загрузить аватар')

            Object.assign(data, {
               avatar_url:
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Avatars/` +
                  UploadData?.path,
            })
         }

         delete data.avatar

         const { data: updatedData, error } = await UpdateUser({ data })

         if (error) toast.error(error)

         if (setUser && updatedData) setUser(updatedData)
      }
      // сброс
      const ResetClick = (e: MouseEvent) => {
         e.preventDefault()
         reset()
         setAvatarURL(avatar)
      }

      // выбор аватара и регистрирование input для выбора аватара
      const ChooseAvClick = () => {
         if (!InputFileRef.current) return toast.error('Ошибка')
         ;(InputFileRef.current as HTMLInputElement).click()
      }

      const {
         ref: hiddenInputRef,
         onChange,
         ...restHiddenInputProps
      } = register('avatar' as Path<EditableInputs>)

      const onAvatarInputChange = (e: ChangeEvent<HTMLInputElement>) => {
         const RHFhandler = onChange(e)

         if (!e.target.files) return

         const reader = new FileReader()

         const readerLoadFn = (event: ProgressEvent<FileReader>) => {
            if (event.target?.result && typeof event.target.result !== 'object')
               setAvatarURL(event.target.result)
         }
         reader.addEventListener('load', readerLoadFn)

         reader.readAsDataURL(e.target.files[0])

         return () => {
            reader.removeEventListener('load', readerLoadFn)
            return RHFhandler
         }
      }

      return (
         <div
            className={cn(`custom-scroll overflow-y-auto`, className)}
            ref={ref}
         >
            <ChangeAvatar AvatarURL={AvatarURL} ChooseAvClick={ChooseAvClick} />
            <form onSubmit={handleSubmit(Submit)}>
               <section className="flex w-full flex-col gap-4 px-4 500p:px-24 768p:px-6">
                  {Info.map((item) => {
                     if (item.Editable)
                        return (
                           <StyledInput<EditableInputs>
                              options={
                                 AuthFormPatterns[
                                    (item.Value as keyof typeof AuthFormPatterns) ||
                                       {}
                                 ]
                              }
                              register={register}
                              error={errors[item.Value]}
                              name={item.Value}
                              key={item.Value}
                              type={item.type}
                              title={item.Title}
                              defaultValue={item.Text}
                              background={`peer-focus:bg-black peer-focus:text-white 
                                 dark:peer-focus:bg-white dark:peer-focus:text-black
                                 peer-autofill:bg-black peer-autofill:text-white
                                 dark:peer-autofill:bg-white dark:peer-autofill:text-black`}
                              autoComplete={item.Value}
                           />
                        )
                  })}
                  <StyledInput
                     options={AuthFormPatterns.passwordWithoutRequire}
                     register={register}
                     error={errors.password}
                     name="password"
                     key="password"
                     type="password"
                     title="Пароль"
                     background={`peer-focus:bg-black peer-focus:text-white
                         dark:peer-focus:bg-white dark:peer-focus:text-black
                         peer-autofill:bg-black peer-autofill:text-white
                         dark:peer-autofill:bg-white dark:peer-autofill:text-black`}
                     autoComplete="new-password"
                  />
               </section>
               <div className="mt-5 flex justify-center gap-4">
                  <Button variant="outline" onClick={ResetClick}>
                     Сбросить
                  </Button>
                  <Button
                     variant="secondary"
                     disabled={!isValid || isSubmitting}
                  >
                     {isSubmitting && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                     )}
                     Сохранить
                  </Button>
               </div>
               <input
                  {...restHiddenInputProps}
                  onChange={onAvatarInputChange}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={(e) => {
                     hiddenInputRef(e)
                     InputFileRef.current = e
                  }}
               />
            </form>
         </div>
      )
   }
)
ProfileEditModalContent.displayName = 'ProfileEditModalContent'

export default ProfileEditModalContent
