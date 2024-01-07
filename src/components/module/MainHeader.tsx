"use client";

import HeaderButton from "@/components/entity/HeaderButton";
import Link from "next/link";
import { URLList } from "@/utils/const";
import MainMenuDropDown from "@/components/widgets/MainMenuDropDown";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { useMatchMedia } from "@/hooks/MatchMedia";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IMainHeader {
  HeaderButtons: { text: string; icon: StaticImport; link: string }[];
}

export default function MainHeader({ HeaderButtons }: IMainHeader) {
  const [IsHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const prevScrollValue = useRef(40);
  const isMobile = useMatchMedia(820);
  const direction = isMobile ? 150 : -150;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const difference = prevScrollValue.current < latest;
    prevScrollValue.current = latest;

    const timer = setTimeout(() => {
      setIsHidden(difference);
    }, 250);

    return () => clearTimeout(timer);
  });

  if (isMobile === null) return;

  return (
    <motion.header
      initial={{ y: direction }}
      animate={{ y: IsHidden ? direction : 0 }}
      className="fixed w-full bottom-4 768p:bottom-auto 768p:top-6
       px-3 300p:px-6 768p:px-10
        grid place-items-center z-20 pointer-events-none"
    >
      <nav
        className="bg-[#979797] dark:bg-white bg-opacity-30 dark:bg-opacity-20 backdrop-blur-md shadow-xl
        w-full h-full grid grid-cols-5 768p:grid-cols-6 rounded-[30px] 768p:rounded-[10px]
        py-3 px-3 768p:px-6 max-w-[500px] 768p:max-w-[1000px] min-w-[200px] pointer-events-auto"
      >
        <Link
          href={URLList.home}
          className="hover:[text-shadow:_0_0_10px_#3b82f6] transition-all duration-500 opacity-80
            hover:drop-shadow-[0_0_15px_var(--Main)] items-center hidden 768p:flex"
        >
          <Logo
            scale={0.55}
            variant="filled"
            color="var(--Main)"
            className="h-[20px]"
          />
        </Link>
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
      </nav>
    </motion.header>
  );
}
