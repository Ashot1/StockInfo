import { ReactNode } from 'react'
import ThemeProvider from '@/hoc/ThemeProvider'

export default async function FrontPagesLayout({
   children,
}: {
   children: ReactNode
}) {
   return (
      <ThemeProvider
         defaultTheme="dark"
         disableTransitionOnChange
         forcedTheme="dark"
         attribute="class"
      >
         {children}
      </ThemeProvider>
   )
}
