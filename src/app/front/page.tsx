import { SupabaseCustomServer } from '@/utils/supabase/server'
import FirstBlock from '@/app/front/FirstBlock'
import SecondBlock from '@/app/front/SecondBlock'
import ScrollSnapBlock from '@/components/ui/HightOrder/ScrollSnapBlock'

export default async function HomePage() {
   const {
      data: { session },
   } = await SupabaseCustomServer().auth.getSession()

   const links = ['#firstBlock', '#secondBlock']

   return (
      <ScrollSnapBlock links={links}>
         <FirstBlock
            session={session}
            className="snap-selector min-h-screen snap-center"
         />
         <SecondBlock className="snap-selector min-h-screen snap-center" />
      </ScrollSnapBlock>
   )
}
