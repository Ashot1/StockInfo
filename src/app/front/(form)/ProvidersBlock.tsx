'use client'

import { FC } from 'react'
import LoginProviderButton from '@/components/ui/Buttons/LoginProviderButton'
import Image from 'next/image'
import { OAuthProviders } from '@/types/Auth.types'
import { LoginWithOAuth } from '@/actions/Account/Client'
import toast from 'react-hot-toast'
import { MouseEvent } from 'react'

const LoginWithprovider = async (e: MouseEvent<HTMLButtonElement>) => {
   const toastID = toast.loading('Вход...')
   const { data, error } = await LoginWithOAuth(
      e.currentTarget.value as OAuthProviders
   )

   if (error || !data)
      return toast.error(error || 'Ошибка входа', { id: toastID })
}

const ProvidersBlock: FC = () => {
   return (
      <>
         <div
            className={`mt-5 flex w-full items-center gap-4 before:block before:h-[2px] before:flex-1 before:rounded-full before:bg-black/10 after:block after:h-[2px] after:flex-1 after:rounded-full after:bg-black/10`}
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
      </>
   )
}

export default ProvidersBlock
