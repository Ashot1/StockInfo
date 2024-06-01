import { SupabaseCustomServer } from '@/utils/supabase/server'
import FirstBlock from '@/app/front/FrontContent/FirstBlock'
import SecondBlock from '@/app/front/FrontContent/SecondBlock'
import ScrollSnapBlock from '@/components/ui/HightOrder/ScrollSnapBlock'
import ThirdBlock from '@/app/front/FrontContent/ThirdBlock'
import FourthBlock from '@/app/front/FrontContent/FourthBlock'

export default async function HomePage() {
   const {
      data: { session },
   } = await SupabaseCustomServer().auth.getSession()

   const links = ['firstBlock', 'secondBlock', 'thirdBlock', 'fourthBlock']

   return (
      <ScrollSnapBlock
         links={links}
         direction={{ wide: 'right', mobile: 'bottom' }}
      >
         <FirstBlock
            nextLink={`#${links[1]}`}
            session={session}
            className="snap-selector min-h-screen snap-center"
            id={links[0]}
         />
         <SecondBlock
            className="snap-selector min-h-screen snap-center px-[10%] 1080p:px-[20%]"
            id={links[1]}
         />
         <ThirdBlock
            className="snap-selector min-h-screen snap-center"
            id={links[2]}
         />
         <FourthBlock
            className="snap-selector min-h-screen snap-center px-[10%] 1080p:px-[20%]"
            id={links[3]}
         />
      </ScrollSnapBlock>
   )
}
