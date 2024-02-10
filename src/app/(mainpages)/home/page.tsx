import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { GetUser } from '@/actions/Account'

export default async function Info() {
   const { data: user, error } = await GetUser()

   if (error)
      return <div className="grid h-dvh w-dvw place-items-center">{error}</div>

   return (
      <>
         <div className="flex animate-appearance justify-between 768p:justify-center">
            <span className="max-w-[50%]">
               <p className="text-xs opacity-50 768p:text-center 768p:text-sm">
                  Добро пожаловать
               </p>
               <p className="truncate 768p:text-center 768p:text-lg">
                  {user?.user_metadata.full_name}
               </p>
            </span>
            <span className="768p:hidden">
               <MainMenuDropDown />
            </span>
         </div>
      </>
   )
}
