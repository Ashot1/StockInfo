import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase.types'

export function SupabaseCustomClient() {
   
   return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
}
