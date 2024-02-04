import { ReactNode } from 'react'
import MainHeader from '@/components/module/MainHeader'
import AuthProvider from '@/hoc/AuthProvider'
import { URLList } from '@/utils/const'
import StockIcon from '@/../public/Menu/stocks.svg'
import NewsIcon from '@/../public/Menu/News.svg'
import HomeIcon from '@/../public/Menu/home.svg'
import BondsIcon from '@/../public/Menu/bond.svg'
import CurrencyIcon from '@/../public/Menu/currency.svg'
import { GetUser } from '@/actions/Account'

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
   const { data: user, error } = await GetUser()

   // TODO: Сделать нормальное сообщение об ошибке
   if (!user || error)
      return (
         <div>
            {error}
            <h1>Произошла ошибка с аккаунтом</h1>
            <p>попробуйте заново войти в аккаунт</p>
            <a href={URLList.front}>на странице входа</a>
         </div>
      )

   return (
      <>
         <AuthProvider value={user}>
            <MainHeader HeaderButtons={HeaderButtons} />
            <main
               className="mt-6 768p:mt-40 mb-10 500p:w-[80%] 500p:ml-[10%]
                    px-2 1080p:px-[15dvw] min-h-dvh flex flex-col"
            >
               {children}
            </main>
         </AuthProvider>
      </>
   )
}
