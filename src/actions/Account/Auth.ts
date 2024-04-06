'use server'

import {
   LoginPasswordInfo,
   OAuthProviders,
   RegisterPasswordInfo,
} from '@/types/Auth.types'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import TryCatch from '@/utils/TryCatch'
import { SupabaseCustomClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { URLList } from '@/utils/const'

export async function LoginWithPassword({
   password,
   email,
}: LoginPasswordInfo) {
   return TryCatch(async () => {
      const supabase = await SupabaseCustomServer()
      const { error, data } = await supabase.auth.signInWithPassword({
         password: password,
         email: email,
      })
      if (error) throw error

      return { data: data }
   })
}

export async function RegisterWithPassword({
   password,
   email,
   metadata,
}: RegisterPasswordInfo) {
   const { error, data } = await TryCatch(async () => {
      const supabase = SupabaseCustomServer()

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
}

export async function SignOut() {
   return TryCatch(async () => {
      const supabase = SupabaseCustomServer()

      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error

      return { data: undefined }
   })
}
