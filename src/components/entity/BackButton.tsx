'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/ShadCN/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/utils'

const BackButton: FC<{
   backButtonLink?: string
   className?: string
}> = ({ backButtonLink, className }) => {
   const navigate = useRouter()

   if (backButtonLink)
      return (
         <Button
            variant="ghost"
            className={cn(
               'group rounded-full bg-primary/10 duration-500 hover:bg-primary/20 768p:pl-2',
               className
            )}
         >
            <Link href={backButtonLink} className="flex items-center">
               <ChevronRightIcon className="h-6 w-6 rotate-180 opacity-60 duration-500 group-hover:-translate-x-1 4k:h-10 4k:w-10" />
               <span>Назад</span>
            </Link>
         </Button>
      )

   return (
      <Button
         variant="ghost"
         onClick={() => navigate.back()}
         className={cn(
            'group rounded-full bg-primary/5 duration-500 hover:bg-primary/10 768p:pl-2',
            className
         )}
      >
         <ChevronRightIcon className="h-6 w-6 rotate-180 opacity-60 duration-500 group-hover:-translate-x-1 4k:h-10 4k:w-10" />
         <span>Назад</span>
      </Button>
   )
}

export default BackButton
