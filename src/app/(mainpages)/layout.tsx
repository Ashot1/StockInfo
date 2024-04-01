import { ReactNode } from 'react'
import MainHeader from '@/components/module/MainHeader'
import AuthProvider from '@/hoc/AuthProvider'
import { LocalStorageParameters, URLList } from '@/utils/const'
import StockIcon from '@/../public/Menu/stocks.svg'
import NewsIcon from '@/../public/Menu/News.svg'
import HomeIcon from '@/../public/Menu/home.svg'
import BondsIcon from '@/../public/Menu/bond.svg'
import CurrencyIcon from '@/../public/Menu/currency.svg'
import { GetUser, GetUserMainData } from '@/actions/Account/Account'
import ScrollStateBar from '@/components/entity/ScrollStateBar'
import { redirect } from 'next/navigation'
import LocalSettingsChecker from '@/hoc/LocalSettingsChecker'

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

   const [authRes, infoRes] = await Promise.all([authReq, infoReq])

   const { data: user, error } = authRes
   const { data: mainInfo, error: mainError } = infoRes

   // TODO: Сделать нормальное сообщение об ошибке
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
         <AuthProvider value={{ authInfo: user, mainInfo: mainInfo }}>
            <ScrollStateBar />
            <MainHeader HeaderButtons={HeaderButtons} />
            <main
               className="mb-10 mt-6 flex min-h-dvh flex-col
                    px-2 500p:ml-[10%] 500p:w-[80%] 768p:mt-40 1080p:px-[15dvw]"
            >
               {children}
            </main>
         </AuthProvider>
      </>
   )
}
