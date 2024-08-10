'use client'

import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/ShadCN/button'
import { useRouter } from 'next/navigation'
import { AuthFormPatterns, URLList } from '@/utils/config'
import { LoginWithPassword } from '@/actions/Account/Auth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import ProvidersBlock from '@/components/entity/Front/ProvidersBlock'
import SiteHeading from '@/components/ui/Front/SiteHeading'
import StyledInput from '@/components/ui/Inputs/StyledInput'
import { FC, useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'

type loginInputs = { email: string; password: string }

const MotionLink = motion(Link)

const FrontLoginForm: FC = () => {
   const {
      handleSubmit,
      control,
      register,
      formState: { isValid, isSubmitting, isSubmitSuccessful, errors },
   } = useForm<loginInputs>({ mode: 'all' })

   const router = useRouter()
   const [scope, animate] = useAnimate()

   const onSubmit = async ({ password, email }: loginInputs) => {
      const toastID = toast.loading('Вход...')
      const response = await LoginWithPassword({ email, password })

      if (response?.error || !response?.data)
         return toast.error(response?.error || 'Ошибка входа', { id: toastID })

      toast.success('Успешный вход', { id: toastID })
      router.replace(URLList.home)
   }

   useEffect(() => {
      animate(
         'label',
         {
            opacity: [0, 1],
            scaleX: [0.8, 1],
         },
         { delay: 0.5 }
      )
   }, [animate])

   return (
      <div
         className="order-1 h-full w-full bg-background text-neutral-700 768p:order-2"
         ref={scope}
      >
         <SiteHeading>
            <h1 className="mt-1 text-sm text-primary opacity-55">
               С возвращением
            </h1>
         </SiteHeading>
         <section className="flex flex-col justify-center px-10 py-3">
            <ProvidersBlock />
            <form
               className="mt-7 flex flex-col gap-2"
               onSubmit={handleSubmit(onSubmit)}
            >
               <Controller
                  name="email"
                  control={control}
                  rules={AuthFormPatterns.email}
                  render={({ field, fieldState }) => (
                     <StyledInput
                        autoFocus
                        title="Email"
                        labelClassName="opacity-0 fill-mode-forwards"
                        background="peer-focus:bg-background peer-focus:text-primary peer-autofill:bg-background peer-autofill:text-primary"
                        error={fieldState.error}
                        type="email"
                        autoComplete="email"
                        defaultValue={field.value}
                        {...field}
                        value={field.value || ''}
                     />
                  )}
               />
               <StyledInput<loginInputs>
                  name="password"
                  title="Пароль"
                  labelClassName="opacity-0 fill-mode-forwards"
                  background="peer-focus:bg-background peer-focus:text-primary peer-autofill:bg-background peer-autofill:text-primary"
                  error={errors.password}
                  type="password"
                  autoComplete="current-password"
                  options={AuthFormPatterns.password}
                  register={register}
               />
               <Button
                  variant="secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="rounded-xl py-6"
                  disabled={!isValid || isSubmitting || isSubmitSuccessful}
               >
                  Войти
               </Button>
            </form>
            <MotionLink
               href={URLList.register}
               className="mt-4 w-full text-center text-primary/50 underline"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.45 }}
            >
               Зарегистрироваться
            </MotionLink>
         </section>
      </div>
   )
}

export default FrontLoginForm
