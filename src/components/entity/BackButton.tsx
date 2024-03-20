'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/ShadCN/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const BackButton: FC<{
   backButtonLink?: string
}> = ({ backButtonLink }) => {
   const navigate = useRouter()

   if (backButtonLink)
      return (
         <Button variant="ghost" className="rounded-full opacity-60 768p:pl-2">
            <Link href={backButtonLink} className="flex items-center">
               <ChevronRightIcon className="h-6 w-6 rotate-180 4k:h-10 4k:w-10" />
               <span>Назад</span>
            </Link>
         </Button>
      )

   return (
      <Button
         variant="ghost"
         onClick={() => navigate.back()}
         className="rounded-full 768p:pl-2"
      >
         <ChevronRightIcon className="h-6 w-6 rotate-180 opacity-60 4k:h-10 4k:w-10" />
         <span>Назад</span>
      </Button>
   )
}

export default BackButton
