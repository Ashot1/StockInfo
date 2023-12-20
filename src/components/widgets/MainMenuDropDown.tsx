"use client";

import DropDownMenu, { DropDownContext } from "@/components/ui/DropDownMenu";
import MenuButton from "@/components/ui/MenuButton";
import { FC, useContext } from "react";

export default function MainMenuDropDown() {
  return (
    <DropDownMenu>
      <DropDownTrigger />
    </DropDownMenu>
  );
}

const DropDownTrigger: FC = () => {
  const state = useContext(DropDownContext);

  return (
    <MenuButton
      dopClassRows={`${
        state ? "bg-blue-500" : "bg-neutral-700 dark:bg-neutral-300"
      } group-hover:bg-blue-500 transition-all duration-200`}
    />
  );
};
