import { ReactNode } from 'react'
import MainHeader from '@/components/module/MainHeader'
import AuthProvider from '@/hoc/AuthProvider'
import { LocalStorageParameters, URLList } from '@/utils/const'
import StockIcon from '@/../public/Menu/stocks.svg'
import NewsIcon from '@/../public/Menu/News.svg'
import HomeIcon from '@/../public/Menu/home.svg'
import BondsIcon from '@/../public/Menu/bond.svg'
import CurrencyIcon from '@/../public/Menu/currency.svg'
import {
   GetUser,
   GetUserMainData,
   getAllUserTransactions,
   getActualUserTransactions,
} from '@/actions/Account/Account'
import ScrollStateBar from '@/components/entity/ScrollStateBar'
import { redirect } from 'next/navigation'
import LocalSettingsChecker from '@/hoc/LocalSettingsChecker'
import ControlPanel from '@/components/module/ControlPanel'

const HeaderButtons = [
   { text: 'Новости', icon: NewsIcon, link: URLList.news },
   { text: 'Акции', icon: StockIcon, link: URLList.stocks },
   { text: 'Главная', icon: HomeIcon, link: URLList.home },
   { text: 'Облигации', icon: BondsIcon, link: URLList.bonds },
   { text: 'Валюта', icon: CurrencyIcon, link: URLList.currency },
]

export default async function MainPagesLayout({
   children,
}: {
   children: ReactNode
}) {
   const authReq = GetUser()
   const infoReq = GetUserMainData()
   const transactionsReq = getActualUserTransactions()

   const [authRes, infoRes, transactionsRes] = await Promise.all([
      authReq,
      infoReq,
      transactionsReq,
   ])

   const { data: user, error } = authRes
   const { data: mainInfo, error: mainError } = infoRes
   const { data: transactions, error: transactionsError } = transactionsRes

   if (!user || error) return redirect(URLList.front)

   return (
      <>
         <LocalSettingsChecker
            Params={LocalStorageParameters.glowBG}
            needAlert={true}
            textAlert={{
               title: 'Эффект свечения включен',
               text: 'Если будут наблюдаться проблемы с производительностью вы сможете отключить его в настройках',
            }}
         >
            <div className="glow-effect" />
         </LocalSettingsChecker>

         <AuthProvider
            value={{
               authInfo: user,
               mainInfo: {
                  user_id: mainInfo?.user_id || '',
                  transactions: transactions?.data,
                  current_money: mainInfo?.current_money || 0,
                  start_money: mainInfo?.start_money || 0,
                  favorites: mainInfo?.favorites || [],
                  purchases: mainInfo?.purchases || [],
                  visits: mainInfo?.visits || [],
               },
            }}
         >
            <ScrollStateBar />
            <MainHeader HeaderButtons={HeaderButtons} />
            <main
               className="mb-10 mt-6 flex min-h-dvh flex-col
                    px-2 500p:ml-[10%] 500p:w-[80%] 768p:mt-40 1080p:px-[15dvw]"
            >
               <ControlPanel />
               {children}
            </main>
         </AuthProvider>
      </>
   )
}
