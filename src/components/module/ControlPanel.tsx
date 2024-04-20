'use client'
import BackButton from '@/components/entity/BackButton'
import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { usePathname } from 'next/navigation'
import { URLList } from '@/utils/const'
import PageTitle from '@/components/ui/PageTitle'
import { FC, memo, ReactNode, useContext } from 'react'
import { AuthContext } from '@/hoc/AuthProvider'
import FavoriteList from '@/components/widgets/FavoriteList'
import Search from '@/components/widgets/Search'
import { searchBond, searchStock } from '@/actions/CLIENT-CommonSecurity'

const ControlPanel = () => {
   const path = usePathname()
   const { user_metadata } = useContext(AuthContext).authInfo

   const homeTitleContent = (
      <span className="max-w-[50%]">
         <p className="text-xs opacity-50 768p:text-center 768p:text-sm">
            Добро пожаловать
         </p>
         <p className="truncate 768p:text-center 768p:text-lg">
            {user_metadata.full_name}
         </p>
      </span>
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

   const isInContent = Object.values(URLList).includes(path)

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
         <FavoriteList />
      </>
   )
}

export default ControlPanel
