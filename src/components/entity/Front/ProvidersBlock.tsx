'use client'

import { FC } from 'react'
import LoginProviderButton from '@/components/ui/Buttons/LoginProviderButton'
import Image from 'next/image'
import { OAuthProviders } from '@/types/Auth.types'
import { LoginWithOAuth } from '@/actions/Account/Client'
import toast from 'react-hot-toast'
import { MouseEvent } from 'react'
import { motion } from 'framer-motion'

const LoginWithprovider = async (e: MouseEvent<HTMLButtonElement>) => {
   const toastID = toast.loading('Вход...')
   const { data, error } = await LoginWithOAuth(
      e.currentTarget.value as OAuthProviders
   )

   if (error || !data)
      return toast.error(error || 'Ошибка входа', { id: toastID })
}

const MotionLoginProviderButton = motion(LoginProviderButton)

const ProvidersBlock: FC = () => {
   const Animation = {
      initial: { transform: 'scale(0.5)', opacity: 0 },
      animate: { transform: 'scale(1)', opacity: 1 },
   }

   return (
      <>
         <div className="flex w-full items-center justify-center gap-6">
            <MotionLoginProviderButton
               {...Animation}
               color="#7289da"
               value="discord"
               onClick={LoginWithprovider}
               aria-label="Войти с помощью discord"
            >
               <Image
                  src="/signup/discord.svg"
                  alt="Логотип discord"
                  width={15}
                  height={15}
               />
            </MotionLoginProviderButton>
            <MotionLoginProviderButton
               {...Animation}
               color="white"
               value="google"
               onClick={LoginWithprovider}
               aria-label="Войти с помощью google"
            >
               <Image
                  src="/signup/google.png"
                  alt="Логотип google"
                  width={15}
                  height={15}
               />
            </MotionLoginProviderButton>
         </div>
         <div
            className={`mt-5 flex w-full items-center gap-4 before:block before:h-[2px] before:flex-1 before:rounded-full before:bg-primary/10 after:block after:h-[2px] after:flex-1 after:rounded-full after:bg-primary/10`}
         >
            <p
               className="text-sm"
               aria-label="Или войти с помощью логина и пароля снизу"
            >
               или
            </p>
         </div>
      </>
   )
}

export default ProvidersBlock
