import { ReactNode } from 'react'
import { URLList } from '@/utils/config'
import { redirect } from 'next/navigation'
import { SupabaseCustomServer } from '@/utils/supabase/server'

export default async function FormLayout({
   children,
}: {
   children: ReactNode
}) {
   // const supabase = SupabaseCustomServer()
   // const { data } = await supabase.auth.getSession()
   //
   // if (data.session?.user) redirect(URLList.home)

   return (
      <div className="relative flex h-dvh w-dvw bg-background">{children}</div>
   )
}

// container - min-h-[90dvh] w-[95dvw] max-w-[1500px] 1024p:w-[70dvw] bg-gradient-to-br from-[#8BC6EC] to-[#9599E2]
// wrapper - py-[5dvh] min-h-dvh w-dvw
//bg-gradient-to-br from-[#8BC6EC] to-[#9599E2]
