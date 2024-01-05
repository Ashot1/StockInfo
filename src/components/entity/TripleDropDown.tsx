"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TripleMenu from "@/components/ui/TripleMenu";
import { FC, ReactNode } from "react";

const TripleDropDown: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TripleMenu
          dopClassRows={`bg-main transition-all group-hover:shadow-[0_0_15px_var(--Main)] duration-200`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TripleDropDown;
