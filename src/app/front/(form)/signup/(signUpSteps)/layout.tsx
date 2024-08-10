import { ReactNode } from 'react'
import SignUpProvider from '@/hoc/front/SignUpProvider'
import { signUpSteps } from '@/utils/config'

export default function Layout({
   children,
   profilePreview,
}: {
   children: ReactNode
   profilePreview: ReactNode
}) {
   return (
      <SignUpProvider signUpSteps={signUpSteps}>
         <div className="grid flex-1 grid-cols-1 768p:768p:grid-cols-[1fr_500px]">
            {profilePreview}
            {children}
         </div>
      </SignUpProvider>
   )
}
