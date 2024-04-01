import MainMenuDropDown from '@/components/module/MainMenuDropDown'
import { GetUser } from '@/actions/Account/Account'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { UserMetadata } from '@/types/Auth.types'

export default async function Info() {
   const { data: user, error } = await GetUser()

   const metadata = user?.user_metadata as UserMetadata | undefined

   if (error) return <ErrorMessage errMessage={error} />

   return (
      <>
         <div className="flex animate-appearance justify-between 768p:justify-center">
            <span className="max-w-[50%]">
               <p className="text-xs opacity-50 768p:text-center 768p:text-sm">
                  Добро пожаловать
               </p>
               <p className="truncate 768p:text-center 768p:text-lg">
                  {metadata?.full_name}
               </p>
            </span>
            <span className="768p:hidden">
               <MainMenuDropDown />
            </span>
         </div>
      </>
   )
}
