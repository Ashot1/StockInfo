import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase.types'

export function SupabaseCustomService() {
   return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
   )
}
