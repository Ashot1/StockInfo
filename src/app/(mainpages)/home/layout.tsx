import { ReactNode } from 'react'
import HomeProvider from '@/hoc/Providers/HomeProvider'

export default function HomeLayout({ children }: { children: ReactNode }) {
   return <HomeProvider>{children}</HomeProvider>
}
