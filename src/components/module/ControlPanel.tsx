'use client'

import BackButton from '@/components/entity/Buttons/BackButton'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { usePathname } from 'next/navigation'
import { URLList } from '@/utils/config'
import PageTitle from '@/components/ui/Text/PageTitle'
import { FC, ReactNode } from 'react'
import { useAuthContext } from '@/hoc/Providers/AuthProvider'
import Favorite from '@/components/module/Favorite'
import Search from '@/components/module/Search'
import {
   searchBond,
   searchStock,
} from '@/actions/Security/CLIENT-CommonSecurity'
import GradientText from '@/components/ui/Text/GradientText'

const ControlPanel = () => {
   const path = usePathname()
   const { user_metadata } = useAuthContext().authInfo

   const homeTitleContent = (
      <h2 className="grid max-w-[50%] grid-cols-1">
         <span className="text-xs opacity-50 768p:text-center 768p:text-sm">
            Добро пожаловать
         </span>
         <GradientText className="truncate 768p:text-center 768p:text-lg">
            {user_metadata.full_name}
         </GradientText>
      </h2>
   )

   const PathContent: {
      [key: string]: { title: ReactNode; additional: ReactNode }
   } = {
      [URLList.news]: {
         title: <PageTitle>Новости</PageTitle>,
         additional: <DefaultAdditional />,
      },
      [URLList.stocks]: {
         title: <PageTitle>Список акций</PageTitle>,
         additional: (
            <DefaultAdditional>
               <Search
                  searchRequest={searchStock}
                  url={URLList.stocks}
                  imgURL={URLList.logos_stock}
                  imgType="svg"
               />
            </DefaultAdditional>
         ),
      },
      [URLList.bonds]: {
         title: <PageTitle>Список облигаций</PageTitle>,
         additional: (
            <DefaultAdditional>
               <Search
                  searchRequest={searchBond}
                  url={URLList.bonds}
                  imgURL={URLList.logos_bonds}
                  imgType="png"
               />
            </DefaultAdditional>
         ),
      },
      [URLList.currency]: {
         title: <PageTitle>Список валют</PageTitle>,
         additional: <DefaultAdditional />,
      },
      [URLList.home]: {
         title: homeTitleContent,
         additional: <DefaultAdditional />,
      },
   }

   const isInContent = Object.keys(PathContent).includes(path)

   return (
      <div className="mb-10 flex animate-appearance flex-col gap-6">
         <div className="flex w-full items-center justify-between 768p:justify-center">
            {isInContent ? PathContent[path].title : <BackButton />}
            <div className="block 768p:hidden">
               <MainMenuDropDown />
            </div>
         </div>
         {isInContent && (
            <div className="flex items-center justify-center gap-2 500p:gap-6">
               {PathContent[path].additional}
            </div>
         )}
      </div>
   )
}

const DefaultAdditional: FC<{ children?: ReactNode }> = ({ children }) => {
   return (
      <>
         {children}
         <Favorite />
      </>
   )
}

export default ControlPanel
