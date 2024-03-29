import * as React from 'react'
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   DotsHorizontalIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/utils/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/ShadCN/button'
import Link from 'next/link'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
   <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
   />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
   HTMLUListElement,
   React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
   <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
   />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
   HTMLLIElement,
   React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
   <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
   isActive?: boolean
} & Pick<ButtonProps, 'size'> &
   React.ComponentProps<typeof Link>

const PaginationLink = ({
   className,
   isActive,
   size = 'icon',
   href = '#',
   ...props
}: PaginationLinkProps) => (
   <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
         buttonVariants({
            variant: isActive ? 'outline' : 'ghost',
            size,
         }),
         'text-xs 300p:text-sm',
         className
      )}
      {...props}
   />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
   className,
   ...props
}: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink
      aria-label="Перейти на предыдущую страницу"
      size="icon"
      className={cn('', className)}
      {...props}
   >
      <ChevronLeftIcon className="h-4 w-4" />
   </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
   className,
   ...props
}: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink
      aria-label="Перейти на следующую страницу"
      size="icon"
      className={cn('', className)}
      {...props}
   >
      <ChevronRightIcon className="h-4 w-4" />
   </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
   className,
   ...props
}: React.ComponentProps<'span'>) => (
   <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
   >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">Больше страниц</span>
   </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
   Pagination,
   PaginationContent,
   PaginationLink,
   PaginationItem,
   PaginationPrevious,
   PaginationNext,
   PaginationEllipsis,
}
