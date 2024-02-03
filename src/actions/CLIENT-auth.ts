'use client'

import { supabase } from '@/utils/Supabase.init'
import TryCatch from '@/utils/TryCatch'
import toast from 'react-hot-toast'
import {
   LoginPasswordInfo,
   OAuthData,
   OAuthProviders,
   RegisterPasswordInfo,
} from '@/types/Auth.types'
import { AuthResponse, AuthResponsePassword } from '@supabase/gotrue-js'

export async function LoginWithOAuth(provider: OAuthProviders) {
   const { error, data } = await TryCatch<OAuthData>(async () => {
      const { error, data } = await supabase.auth.signInWithOAuth({
         provider: provider,
         options: { redirectTo: `${location.origin}/auth/callback` },
      })

      if (error) throw error

      return { data: data }
   })

   if (error) toast.error(error)
}

export async function LoginWithPassword({
   password,
   email,
}: LoginPasswordInfo) {
   const { error, data } = await TryCatch<AuthResponsePassword['data']>(
      async () => {
         const { error, data } = await supabase.auth.signInWithPassword({
            password: password,
            email: email,
         })
         if (error) throw error

         return { data: data }
      }
   )

   if (error) toast.error(error)
}

export async function RegisterWithPassword({
   password,
   email,
   metadata,
}: RegisterPasswordInfo) {
   const { error, data } = await TryCatch<AuthResponse['data']>(async () => {
      const { error, data } = await supabase.auth.signUp({
         email: email,
         password: password,
         options: {
            data: metadata,
         },
      })

      if (error) throw error

      return { data: data }
   })

   if (error) toast.error(error)
}
