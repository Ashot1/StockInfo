import { URLList } from '@/utils/config'
import { redirect } from 'next/navigation'

export default async function App() {
   return redirect(URLList.home)
}
