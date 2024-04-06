import { URLList } from '@/utils/const'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function App() {
   return redirect(URLList.home)

   // return (
   //    <div>
   //       <h1>Произошла ошибка</h1>
   //       <p>Перейдите на </p>
   //       <Link href={URLList.home} className="underline">
   //          главную страницу
   //       </Link>{' '}
   //       или обновите страницу
   //    </div>
   // )
}
