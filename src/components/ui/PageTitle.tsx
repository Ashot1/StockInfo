import { ReactNode } from 'react'
import { raleway } from '@/utils/fonts'

export default function PageTitle({ children }: { children: ReactNode }) {
   return (
      <h2 className={`mb-6 text-lg 300p:text-xl ${raleway.className}`}>
         {children}
      </h2>
   )
}
