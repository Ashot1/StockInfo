"use client";

import { FC, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import { PageStartCounter } from "@/utils/const";

const CustomPagination: FC<{
  currentStart: number;
  element: string;
  className?: string;
}> = ({ currentStart, element, className }) => {
  const [BlockWidth, setBlockWidth] = useState(
    document.querySelector<HTMLElement>(element)?.offsetWidth ||
      window.innerWidth,
  );
  const pathname = usePathname();
  const currentPath = pathname + `?start=${currentStart}`;
  const buttons = [];
  const PaginationCount = Math.ceil(BlockWidth / 150);

  useEffect(() => {
    const resizeFunc = () => {
      setBlockWidth(
        document.querySelector<HTMLElement>(element)?.offsetWidth ||
          window.innerWidth,
      );
    };
    window.addEventListener("resize", resizeFunc);

    return () => window.removeEventListener("resize", resizeFunc);
  }, [element]);

  for (let i = 0; i < PaginationCount; i++) {
    const currI =
      i + currentStart / PageStartCounter - Math.floor(PaginationCount / 2);
    if (currI >= 0)
      buttons.push(
        <PaginationItem>
          <PaginationLink
            isActive={currentStart === PageStartCounter * currI}
            href={pathname + `?start=${PageStartCounter * currI}`}
          >
            {currI + 1}
          </PaginationLink>
        </PaginationItem>,
      );
  }

  return (
    <Pagination className="animate-appearance">
      <PaginationContent className={className}>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentStart >= PageStartCounter
                ? pathname + `?start=${currentStart - PageStartCounter}`
                : currentPath
            }
          />
        </PaginationItem>
        {...buttons}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={pathname + `?start=${currentStart + PageStartCounter}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
