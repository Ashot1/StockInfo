import { cookies } from 'next/headers'
import { CookieOptions, createServerClient } from '@supabase/ssr'
import { Database } from '@/types/supabase.types'
import 'server-only'

export function SupabaseCustomServer(admin = false) {
   const cookieStore = cookies()

   return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      admin
         ? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
         : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            get(name: string) {
               return cookieStore.get(name)?.value
            },
            set(name: string, value: any, options: CookieOptions) {
               try {
                  cookieStore.set(name, value)
               } catch (error) {}
            },
            remove(name: string, options: CookieOptions) {
               try {
                  cookieStore.set({ name, value: '', ...options })
               } catch (error) {}
            },
         },
      }
   )
}
