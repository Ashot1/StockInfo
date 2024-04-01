'use client'

import TryCatch from '@/utils/TryCatch'
import { OAuthProviders } from '@/types/Auth.types'
import { SupabaseCustomClient } from '@/utils/supabase/client'

export async function LoginWithOAuth(provider: OAuthProviders) {
   return TryCatch(async () => {
      const supabase = SupabaseCustomClient()

      const { error, data } = await supabase.auth.signInWithOAuth({
         provider: provider,
         options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITEURL!}/auth/callback`,
         },
      })

      if (error) throw error

      return { data }
   })
}
