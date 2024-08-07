'use client'

import { FC, useEffect, useState } from 'react'
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/ShadCN/pagination'
import { usePathname } from 'next/navigation'
import { PageStartCounter } from '@/utils/config'
import CalculatePagination from '@/utils/Pagination'

const CustomPagination: FC<{
   currentStart: number
   element: string
   maxSize: number
   className?: string
   animated?: boolean
}> = ({ currentStart, element, className, maxSize, animated = true }) => {
   const [BlockWidth, setBlockWidth] = useState(0)
   const pathname = usePathname()

   // задавание максимальной длинны при рендере
   useEffect(() => {
      setBlockWidth(
         document.querySelector<HTMLElement>(element)?.offsetWidth ||
            window.innerWidth
      )
   }, [element])

   // перерасчет максимальной длинны при изменении ширины окна
   useEffect(() => {
      const resizeFunc = () => {
         setBlockWidth(
            document.querySelector<HTMLElement>(element)?.offsetWidth ||
               window.innerWidth
         )
      }
      window.addEventListener('resize', resizeFunc)

      return () => window.removeEventListener('resize', resizeFunc)
   }, [element])

   // расчитываем максимальное количество страниц
   const maxButtonsAmount = Math.ceil(maxSize / PageStartCounter)
   const maxPagesLength = maxButtonsAmount * PageStartCounter

   // создание кнопок на основе длинны
   const ButtonsCount = Math.ceil(BlockWidth / 100)
   const buttons = []

   for (let i = 0; i < ButtonsCount; i++) {
      const currI =
         i + currentStart / PageStartCounter - Math.floor(ButtonsCount / 2)

      const CurrentPageCounter = PageStartCounter * currI
      let isPageLessMax = CurrentPageCounter <= maxPagesLength

      if (currI >= 0 && isPageLessMax)
         buttons.push(
            <PaginationItem>
               <PaginationLink
                  isActive={currentStart === CurrentPageCounter}
                  href={pathname + `?start=${CurrentPageCounter}`}
               >
                  {currI + 1}
               </PaginationLink>
            </PaginationItem>
         )
   }

   //создание ссылок для кнопок 'назад' и 'вперед'
   const { prevLink, nextLink } = CalculatePagination({
      start: currentStart,
      maxLength: maxPagesLength,
      Step: PageStartCounter,
      pathname,
   })

   // проверяем, нужен ли ellipsis и делаем ссылки
   const needEllipsisMax =
      currentStart < maxPagesLength - PageStartCounter * (ButtonsCount / 2)
   const maxEllipsisLink = pathname + `?start=${maxPagesLength}`
   const needEllipsisMin = currentStart > PageStartCounter * (ButtonsCount / 2)
   const minEllipsisLink = pathname + `?start=0`

   return (
      <Pagination
         className={animated ? 'animate-appearance' : ''}
         aria-label="Навигация по страницам (пагинация)"
      >
         <PaginationContent className={className}>
            <PaginationItem>
               <PaginationPrevious href={prevLink} />
            </PaginationItem>
            {needEllipsisMin && (
               <PaginationItem>
                  <PaginationLink
                     href={minEllipsisLink}
                     aria-label="Первая страница"
                  >
                     <PaginationEllipsis />
                  </PaginationLink>
               </PaginationItem>
            )}
            {...buttons}
            {needEllipsisMax && (
               <PaginationItem>
                  <PaginationLink
                     href={maxEllipsisLink}
                     aria-label="Последняя страница"
                  >
                     <PaginationEllipsis />
                  </PaginationLink>
               </PaginationItem>
            )}
            <PaginationItem>
               <PaginationNext href={nextLink} />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}

export default CustomPagination
