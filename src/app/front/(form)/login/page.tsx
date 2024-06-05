'use client'

import BaseInput from '@/components/ui/BaseInput'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/ShadCN/button'
import { useRouter } from 'next/navigation'
import { AuthFormPatterns, URLList } from '@/utils/const'
import { LoginWithPassword } from '@/actions/Account/Auth'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LoginProviderButton from '@/components/ui/LoginProviderButton'
import Image from 'next/image'
import { MouseEvent } from 'react'
import { LoginWithOAuth } from '@/actions/Account/Client'
import { OAuthProviders } from '@/types/Auth.types'

type loginInputs = { email: string; password: string }

const MotionLink = motion(Link)

const LoginWithprovider = async (e: MouseEvent<HTMLButtonElement>) => {
   const toastID = toast.loading('Вход...')
   const { data, error } = await LoginWithOAuth(
      e.currentTarget.value as OAuthProviders
   )

   if (error || !data)
      return toast.error(error || 'Ошибка входа', { id: toastID })

   toast.success('Успешный вход', { id: toastID })
}

export default function LoginPage() {
   const {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitting },
   } = useForm<loginInputs>({ mode: 'all' })

   const router = useRouter()

   const onSubmit = async ({ password, email }: loginInputs) => {
      const toastID = toast.loading('Вход...')
      const { data, error } = await LoginWithPassword({ email, password })

      if (error || !data)
         return toast.error(error || 'Ошибка входа', { id: toastID })

      toast.success('Успешный вход', { id: toastID })
      router.push(URLList.home)
   }

   return (
      <section className="flex flex-col justify-center px-10 py-10">
         <h1 className="w-full text-center text-xl uppercase">Вход</h1>
         <form
            className="mt-10 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
         >
            <BaseInput
               name="email"
               placeholder="Введите email"
               register={register}
               error={errors.email}
               options={AuthFormPatterns.email}
               type="email"
            />
            <BaseInput
               name="password"
               placeholder="Введите пароль"
               register={register}
               error={errors.password}
               options={AuthFormPatterns.password}
               type="password"
            />
            <Button
               variant="secondary"
               className="animate-appearance rounded-xl py-6"
               disabled={!isValid || isSubmitting}
            >
               Войти
            </Button>
         </form>
         <MotionLink
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            href={URLList.register}
            className="mt-4 w-full text-center text-black/50 underline"
         >
            Зарегистрироваться
         </MotionLink>
         <div
            className={`mt-5 flex w-full items-center gap-4
                before:block before:h-[2px] before:flex-1 before:rounded-full before:bg-black/10
                after:block after:h-[2px] after:flex-1 after:rounded-full after:bg-black/10`}
         >
            <p className="text-sm">или</p>
         </div>
         <div className="mt-3 flex w-full items-center justify-center gap-6">
            <LoginProviderButton
               color="#7289da"
               value="discord"
               onClick={LoginWithprovider}
            >
               <Image
                  src="/signup/discord.svg"
                  alt="google oauth"
                  width={15}
                  height={15}
               />
            </LoginProviderButton>
            <LoginProviderButton
               color="white"
               value="google"
               onClick={LoginWithprovider}
            >
               <Image
                  src="/signup/google.png"
                  alt="google oauth"
                  width={15}
                  height={15}
               />
            </LoginProviderButton>
         </div>
      </section>
   )
   //
   // return (
   //    <div>
   //       <button
   //          onClick={async () => {
   //             await LoginWithOAuth('google')
   //          }}
   //       >
   //          Google
   //       </button>
   //       <br />
   //       <br />
   //       <button>Info</button>
   //       <br />
   //       <br />
   //       <button
   //          onClick={async () => {
   //             await SignOut()
   //          }}
   //       >
   //          Log out
   //       </button>
   //       <br />
   //       <br />
   //       <button
   //          onClick={async () => {
   //             await LoginWithPassword({
   //                email: '124@mail.ru',
   //                password: '12345656',
   //             })
   //             push(URLList.home)
   //          }}
   //       >
   //          Login with email
   //       </button>
   //       <br />
   //       <br />
   //       <button
   //          onClick={async () => {
   //             await RegisterWithPassword({
   //                email: '124@mail.ru',
   //                password: '12345656',
   //                metadata: {
   //                   avatar_url: '',
   //                   email_verified: false,
   //                   full_name: 'John Doe',
   //                },
   //             })
   //             push(URLList.home)
   //          }}
   //       >
   //          Register with email
   //       </button>
   //       <br />
   //       <br />
   //       <button onClick={async () => await LoginWithOAuth('discord')}>
   //          Discord
   //       </button>
   //       <br />
   //       <br />
   //       <Link href={URLList.front}>Back</Link>
   //    </div>
   // )
}
