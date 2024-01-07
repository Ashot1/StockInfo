"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

export type TInfoPlaceHolder = {
  title: string;
  text: string;
};

export default function InfoPlaceHolder({ text, title }: TInfoPlaceHolder) {
  return (
    <div
      className="bg-[var(--grayBG)] rounded-xl px-4 py-3 text-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 justify-between flex cursor-pointer"
      onClick={() =>
        toast.promise(navigator.clipboard.writeText(text), {
          loading: "Копирование...",
          success: "Текст скопирован",
          error: (e) => e.message,
        })
      }
    >
      <div>
        <span className="opacity-70">{title}</span>
        <p>{text}</p>
      </div>
      <CopyIcon className="size-4" />
    </div>
  );
}
