import { ReactNode } from 'react'
import { raleway } from '@/utils/fonts'

export default function PageTitle({ children }: { children: ReactNode }) {
   return (
      <p className={`mb-6 text-lg 300p:text-xl ${raleway.className}`}>
         {children}
      </p>
   )
}
