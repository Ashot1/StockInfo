import { ReactNode } from 'react'
import SignUpProvider from '@/hoc/front/SignUpProvider'
import { signUpSteps } from '@/utils/config'
import SignUpUserInfoSection from '@/app/front/(form)/signup/(signUpSteps)/SignUpUserInfoSection'

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <SignUpProvider signUpSteps={signUpSteps}>
         <div className="grid flex-1 grid-cols-1 768p:768p:grid-cols-[1fr_500px]">
            <SignUpUserInfoSection />
            {children}
         </div>
      </SignUpProvider>
   )
}
