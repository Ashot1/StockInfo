import { URLList } from '@/utils/const'
import { redirect } from 'next/navigation'

export default async function App() {
   return redirect(URLList.home)
}
