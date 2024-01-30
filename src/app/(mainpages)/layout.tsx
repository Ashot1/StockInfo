import { ReactNode } from "react";
import MainHeader from "@/components/module/MainHeader";
import AuthProvider from "@/hoc/AuthProvider";
import { cookies, headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toaster } from "react-hot-toast";
import { URLList } from "@/utils/const";
import StockIcon from "@/../public/Menu/stocks.svg";
import NewsIcon from "@/../public/Menu/News.svg";
import HomeIcon from "@/../public/Menu/home.svg";
import BondsIcon from "@/../public/Menu/bond.svg";
import CurrencyIcon from "@/../public/Menu/currency.svg";

const HeaderButtons = [
  { text: "Новости", icon: NewsIcon, link: URLList.news },
  { text: "Акции", icon: StockIcon, link: URLList.stocks },
  { text: "Главная", icon: HomeIcon, link: URLList.home },
  { text: "Облигации", icon: BondsIcon, link: URLList.bonds },
  { text: "Валюта", icon: CurrencyIcon, link: URLList.currency },
];

export default async function MainPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const supabaseServer = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user)
    return (
      <div>
        <h1>Произошла ошибка с аккаунтом</h1>
        <p>попробуйте заново войти в аккаунт</p>
        <a href={URLList.front}>на странице входа</a>
      </div>
    );

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: { background: "hsl(var(--muted))", color: "var(--Main)" },
        }}
      />
      <AuthProvider value={user}>
        <MainHeader HeaderButtons={HeaderButtons} />
        <main
          className="mt-6 768p:mt-40 mb-10 500p:w-[80%] 500p:ml-[10%]
         px-2 1080p:px-[15dvw]"
        >
          {children}
        </main>
      </AuthProvider>
    </>
  );
}
