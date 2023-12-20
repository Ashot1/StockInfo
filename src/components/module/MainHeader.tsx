import StockIcon from "@/../public/Menu/stocks.svg";
import NewsIcon from "@/../public/Menu/News.svg";
import HomeIcon from "@/../public/Menu/home.svg";
import BondsIcon from "@/../public/Menu/bond.svg";
import CurrencyIcon from "@/../public/Menu/currency.svg";
import HeaderButton from "@/components/entity/HeaderButton";
import Link from "next/link";
import { russoOne } from "@/utils/fronts";
import { URLList } from "@/utils/const";
import MainMenuDropDown from "@/components/widgets/MainMenuDropDown";

export default function MainHeader() {
  const HeaderButtons = [
    { text: "Новости", icon: NewsIcon, link: URLList.news },
    { text: "Акции", icon: StockIcon, link: URLList.stocks },
    { text: "Главная", icon: HomeIcon, link: URLList.home },
    { text: "Облигации", icon: BondsIcon, link: URLList.bonds },
    { text: "Валюта", icon: CurrencyIcon, link: URLList.currency },
  ];

  return (
    <header
      className="fixed w-full bottom-4 768p:bottom-auto 768p:top-6
       px-3 300p:px-6 768p:px-10
        grid place-items-center z-20 pointer-events-none"
    >
      <div
        className="bg-[#979797] dark:bg-white bg-opacity-30 dark:bg-opacity-20 backdrop-blur-md shadow-xl
        w-full h-full grid grid-cols-5 768p:grid-cols-6 rounded-[30px] 768p:rounded-[10px]
        py-3 px-6 max-w-[500px] 768p:max-w-[1000px] min-w-[200px] pointer-events-auto
        animate-menuAppearsMobile 768p:animate-menuAppearsPC"
      >
        <p
          className={`hidden 768p:flex ${russoOne.className} text-blue-500 p-2 items-center`}
        >
          <Link
            href={URLList.home}
            className="hover:[text-shadow:_0_0_10px_#3b82f6] transition-all duration-200"
          >
            Stock<span className="">Info</span>
          </Link>
        </p>
        {HeaderButtons.map((item) => (
          <HeaderButton
            text={item.text}
            link={item.link}
            icon={item.icon}
            key={item.link}
          />
        ))}
        <div className="hidden 768p:flex justify-end items-center">
          <MainMenuDropDown />
        </div>
      </div>
    </header>
  );
}
