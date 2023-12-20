"use client";

import { ButtonHTMLAttributes } from "react";

export interface IMenuButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  dopClassWrapper?: string;
  dopClassRows?: string;
}
export default function MenuButton({
  dopClassWrapper,
  dopClassRows,
  ...props
}: IMenuButton) {
  const DefaultStyles = `h-0.5 bg-white ${dopClassRows}`;

  return (
    <button
      type="button"
      className={`w-12 h-12 rounded-md py-1 px-2 cursor-pointer relative flex flex-col gap-1.5 items-end justify-center group ${dopClassWrapper}`}
      {...props}
    >
      <span className={`w-[45%] ${DefaultStyles}`} />
      <span className={`w-[70%] ${DefaultStyles}`} />
      <span className={`w-[95%] ${DefaultStyles}`} />
    </button>
  );
}
