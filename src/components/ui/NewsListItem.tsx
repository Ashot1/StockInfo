import { Pencil1Icon, FilePlusIcon } from "@radix-ui/react-icons";
import { bellota, nunito } from "@/utils/fronts";
import Link from "next/link";
import { FC } from "react";
import { ConvertDate } from "@/utils/ConvertDate";

export interface INewsListItem {
  Title: string;
  createdAt: string;
  editedAt?: string;
  index?: number;
  link: string;
}

export default function NewsListItem({
  editedAt,
  Title,
  index,
  createdAt,
  link,
}: INewsListItem) {
  return (
    <Link
      href={link}
      className="grid grid-rows-[0.5fr_1.6fr] 768p:grid-cols-[0.2fr_1.8fr] 768p:grid-rows-1
       cursor-pointer hover:bg-[var(--grayBG)] hover:rounded-xl border-b border-[var(--grayBG)] transition-all duration-300
       mt-2 py-5 h-64 300p:h-48 500p:h-44 768p:h-32"
    >
      <DisplayIndex index={index} />
      <div className="flex flex-col justify-between">
        <p
          className={`text-pretty 768p:text-wrap text-center 768p:text-left text-sm 768p:text-base ${nunito.className}`}
          dangerouslySetInnerHTML={{ __html: Title }}
        ></p>
        <DisplayDate createdAt={createdAt} editedAt={editedAt} />
      </div>
    </Link>
  );
}

const DisplayDate: FC<Pick<INewsListItem, "createdAt" | "editedAt">> = ({
  createdAt,
  editedAt,
}) => {
  return (
    <span className="flex gap-4 opacity-50 text-xs w-full justify-center 768p:justify-start">
      <p className="flex gap-2 items-center text-center">
        <FilePlusIcon />
        {ConvertDate(createdAt)}
      </p>
      {editedAt && (
        <p className="flex gap-2 items-center text-center">
          <Pencil1Icon />
          {ConvertDate(editedAt)}
        </p>
      )}
    </span>
  );
};

const DisplayIndex: FC<Pick<INewsListItem, "index">> = ({ index }) => {
  if (index)
    return (
      <span
        className={`flex justify-center text-xl 768p:items-center ${bellota.className}`}
      >
        {index < 10 ? "0" : ""}
        {index}.
      </span>
    );
};
