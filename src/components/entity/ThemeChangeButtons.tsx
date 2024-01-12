"use client";

import { FC, MouseEventHandler } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TransparentButton from "@/components/ui/TransparentButton";
import { Half2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeChangeButtons: FC = () => {
  const TBdopClass =
    "flex gap-10 h-[65px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition";
  const { setTheme } = useTheme();

  const Click: MouseEventHandler<HTMLButtonElement> = (e) => {
    setTheme((e.target as HTMLButtonElement).value);
  };
  return (
    <div className="w-full px-5 flex justify-center">
      <Card className="overflow-hidden max-w-[600px] w-[100%]">
        <CardContent className="grid grid-cols-3 p-0">
          <TransparentButton
            dopClass={TBdopClass}
            value="light"
            onClick={Click}
          >
            <SunIcon />
          </TransparentButton>
          <TransparentButton dopClass={TBdopClass} value="dark" onClick={Click}>
            <MoonIcon />
          </TransparentButton>
          <TransparentButton
            dopClass={TBdopClass}
            value="system"
            onClick={Click}
          >
            <Half2Icon />
          </TransparentButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeChangeButtons;
