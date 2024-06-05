import { SupabaseCustomServer } from '@/utils/supabase/server'
import ScrollSnapBlock from '@/components/ui/HightOrder/ScrollSnapBlock'
import MainBlock from '@/app/front/FrontContent/MainBlock'
import FollowBlock from '@/app/front/FrontContent/FollowBlock'
import BuyBlock from '@/app/front/FrontContent/BuyBlock'
import NewsBlock from '@/app/front/FrontContent/NewsBlock'
import SwipeBlock from '@/app/front/FrontContent/SwipeBlock'
import TechBlock from '@/app/front/FrontContent/TechBlock'
import FavoritesBlock from '@/app/front/FrontContent/FavoritesBlock'

export default async function HomePage() {
   const {
      data: { session },
   } = await SupabaseCustomServer().auth.getSession()

   const links = [
      'firstBlock',
      'secondBlock',
      'thirdBlock',
      'fourthBlock',
      'fifthBlock',
      'sixthBlock',
      'seventhBlock',
   ]

   return (
      <ScrollSnapBlock
         links={links}
         navigationPosition={{ wide: 'right', mobile: 'bottom' }}
      >
         <MainBlock session={session} id={links[0]} nextLink={`#${links[1]}`} />
         <FollowBlock id={links[1]} />
         <BuyBlock id={links[2]} />
         <NewsBlock id={links[3]} />
         <SwipeBlock id={links[4]} />
         <TechBlock id={links[5]} />
         <FavoritesBlock id={links[6]} />
      </ScrollSnapBlock>
   )
}
