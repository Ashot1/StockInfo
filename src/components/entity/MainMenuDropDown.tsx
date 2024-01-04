"use client";

import TripleMenu from "@/components/ui/TripleMenu";
import { FC, useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function MainMenuDropDown() {
  const { push } = useRouter();
  const center = "grid place-items-center";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TripleMenu
          dopClassRows={`bg-main transition-all group-hover:shadow-[0_0_15px_var(--Main)] duration-200`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className={center}>Профиль</DropdownMenuItem>
        <DropdownMenuItem className={center} onClick={() => push("/about")}>
          О сайте
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
