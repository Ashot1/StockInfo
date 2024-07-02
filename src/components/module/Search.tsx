'use client'

import { FC, useState } from 'react'
import CustomModalCommand from '@/components/entity/CustomElements/CustomModalCommand'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { CommandGroup, CommandItem } from '@/components/ui/ShadCN/command'
import {
   SecuritySearchData,
   SecuritySearchRequest,
} from '@/types/Security.types'
import toast from 'react-hot-toast'
import DefaultListItem from '@/components/ui/Lists/DefaultList/DefaultListItem'

export type TSearch = {
   searchRequest: (
      value: string
   ) => Promise<{ data?: SecuritySearchRequest; error?: string }>
   url: string
   imgURL: string
   imgType: string
   defaultSRC?: string
}

const Search: FC<TSearch & Pick<any, any>> = ({
   searchRequest,
   url,
   imgURL,
   imgType,
   defaultSRC,
}) => {
   const [SearchData, setSearchData] = useState<
      SecuritySearchData[] | undefined
   >(undefined)

   const sendFunc = (value: string) => {
      searchRequest(value).then(({ data, error }) => {
         if (error || !data) return toast.error(error || 'Ошибка запроса')

         setSearchData(data[1].securities)
      })
   }

   return (
      <CustomModalCommand
         className="min-h-[40dvh] 768p:min-h-0"
         header={{
            title: 'Поиск',
            description: 'Поиск инструмента по названию/тикеру',
         }}
         onSend={sendFunc}
         placeholder="Найти"
         hotKey={{ key: 'i', ctrl: true, shift: false }}
         triggerText={
            <>
               <MagnifyingGlassIcon /> Поиск
               <kbd className="hidden text-[0.7rem] tracking-tighter opacity-50 500p:block">
                  Ctrl + i
               </kbd>
            </>
         }
      >
         {SearchData && (
            <CommandGroup>
               {SearchData.map((item) => (
                  <CommandItem
                     key={item.secid}
                     className="cursor-pointer aria-selected:bg-transparent"
                  >
                     <DefaultListItem
                        defaultIMG={defaultSRC || '/StockPlaceHolder.png'}
                        url={`${url}/${item.secid}`}
                        text={item.shortname}
                        subtext={item.secid}
                        img={`${imgURL}/${item.secid}.${imgType}`}
                        rightText={
                           item.is_traded ? 'Торгуется' : 'Не торгуется'
                        }
                        className="w-full items-center"
                        onErrorClass="dark:invert"
                     />
                  </CommandItem>
               ))}
            </CommandGroup>
         )}
      </CustomModalCommand>
   )
}

export default Search
