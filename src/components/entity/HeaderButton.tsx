"use client";
import { FC } from "react";
import Link from "next/link";
import TransparentButton from "@/components/ui/TransparentButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { raleway } from "@/utils/fronts";
import { IHeaderButton } from "@/types/Header.types";
import { URLList } from "@/utils/const";

const HeaderButton: FC<IHeaderButton> = ({ link, icon, text }) => {
  const pathname = usePathname(),
    baseClass = "opacity-40 768p:opacity-60 dark:opacity-60",
    activeClass =
      "scale-110 768p:scale-100 bg-neutral-500 bg-opacity-20 dark:bg-opacity-30";
  return (
    <TransparentButton
      dopClass={`${raleway.className} cursor-default 768p:${
        link.split("?")[0] === URLList.home && "hidden"
      }`}
    >
      <Link
        href={link}
        className={`rounded-md py-2 px-3 768p:px-4
        hover:bg-neutral-500 hover:bg-opacity-30 dark:hover:bg-opacity-30
        transition-all duration-200 ${
          pathname.startsWith(link) ? activeClass : baseClass
        }`}
      >
        <Image
          src={icon}
          alt={text}
          className={`w-[1.35rem] 500p:w-6 768p:hidden dark:invert`}
        />
        <p className={"hidden 768p:block"}>{text}</p>
      </Link>
    </TransparentButton>
  );
};

export default HeaderButton;
