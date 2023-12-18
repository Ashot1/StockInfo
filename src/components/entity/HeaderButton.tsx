"use client";
import { FC } from "react";
import Link from "next/link";
import TransparentButton from "@/components/ui/TransparentButton";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { usePathname } from "next/navigation";
import { raleway } from "@/utils/fronts";

export interface IHeaderButton {
  link: string;
  icon: StaticImport;
  text: string;
}

const HeaderButton: FC<IHeaderButton> = ({ link, icon, text }) => {
  const pathname = usePathname(),
    baseClass = "opacity-50 dark:opacity-60",
    activeClass = "scale-110";
  return (
    <TransparentButton
      dopClass={`${raleway.className} cursor-default 768p:${
        link === "/home" && "hidden"
      }`}
    >
      <Link
        href={link}
        className={`${pathname.startsWith(link) ? activeClass : baseClass}`}
      >
        <Image
          src={icon}
          alt={text}
          className={`w-5 500p:w-6 768p:hidden dark:invert`}
        />
        <p className={"hidden 768p:block"}>{text}</p>
      </Link>
    </TransparentButton>
  );
};

export default HeaderButton;
