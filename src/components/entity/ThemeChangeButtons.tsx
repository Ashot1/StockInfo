"use client";

import { FC, MouseEventHandler, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TransparentButton from "@/components/ui/TransparentButton";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeChangeButtons: FC = () => {
  const TBdopClass =
    "flex gap-10 h-[65px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition";
  const { setTheme, theme } = useTheme();

  const Click: MouseEventHandler<HTMLButtonElement> = (e) => {
    setTheme((e.target as HTMLButtonElement).value);
  };

  const Buttons: { value: string; icon: ReactNode }[] = [
    { value: "light", icon: <SunIcon /> },
    { value: "dark", icon: <MoonIcon /> },
    { value: "system", icon: <DesktopIcon /> },
  ];

  return (
    <div className="w-full px-5 flex justify-center">
      <Card className="overflow-hidden max-w-[600px] w-[100%]">
        <CardContent className="grid grid-cols-3 p-0">
          {Buttons.map((btn) => {
            let activeClass = "";

            if (theme === btn.value)
              activeClass = "bg-gray-200 dark:bg-neutral-900";
            return (
              <TransparentButton
                TapEffect={false}
                key={btn.value}
                dopClass={`${TBdopClass} ${activeClass}`}
                value={btn.value}
                onClick={Click}
              >
                {btn.icon}
              </TransparentButton>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeChangeButtons;
