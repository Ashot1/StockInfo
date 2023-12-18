import StockIcon from "@/../public/Menu/stocks.svg";
import NewsIcon from "@/../public/Menu/News.svg";
import HomeIcon from "@/../public/Menu/home.svg";
import BondsIcon from "@/../public/Menu/bond.svg";
import CurrencyIcon from "@/../public/Menu/currency.svg";
import HeaderButton from "@/components/entity/HeaderButton";
import Link from "next/link";
import { russoOne } from "@/utils/fronts";

export default function MainHeader() {
  const HeaderButtons = [
    { text: "Новости", icon: NewsIcon, link: "/news" },
    { text: "Акции", icon: StockIcon, link: "/stocks" },
    { text: "Главная", icon: HomeIcon, link: "/home" },
    { text: "Облигации", icon: BondsIcon, link: "/bonds" },
    { text: "Валюта", icon: CurrencyIcon, link: "/currency" },
  ];

  return (
    <header
      className="fixed w-full bottom-6 768p:bottom-auto 768p:top-6
       px-3 300p:px-8 768p:px-10
        grid place-items-center z-20 pointer-events-none"
    >
      <div
        className="bg-[#656565] dark:bg-white bg-opacity-20 dark:bg-opacity-20 backdrop-blur-2xl
        w-full h-full grid grid-cols-5 rounded-[30px]
        p-5 max-w-[500px] 768p:max-w-[1000px] min-w-[200px] pointer-events-auto
        animate-menuAppearsMobile 768p:animate-menuAppearsPC"
      >
        <p className={`hidden 768p:block ${russoOne.className} text-sky-800`}>
          <Link href="/">
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
      </div>
    </header>
  );
}
