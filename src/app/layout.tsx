import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/hoc/ThemeProvider'
import packageJSON from '@/../package.json'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import LocalSettingsChecker from '@/hoc/LocalSettingsChecker'
import { LocalStorageParameters } from '@/utils/const'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
   themeColor: [
      { color: '#121212', media: '(prefers-color-scheme: dark)' },
      {
         color: '#d3d3d3',
         media: '(prefers-color-scheme: light)',
      },
   ],
   colorScheme: 'light dark',
}

export const metadata: Metadata = {
   metadataBase: new URL(process.env.NEXT_PUBLIC_SITEURL as string),
   title: {
      default: 'StockInfo',
      template: '%s | StockInfo',
   },
   description: packageJSON.description,
   manifest: '/manifest/manifest.json',
   icons: '/icon.png',
   keywords: ['StockInfo', 'Акции', 'Облигации', 'Котировки', 'Валюта'],
   openGraph: {
      title: 'StockInfo',
      description: packageJSON.description,
      images: '/icon.png',
      locale: 'ru-RU',
   },
   twitter: {
      title: 'StockInfo',
      description: packageJSON.description,
      images: '/icon.png',
   },
   applicationName: 'StockInfo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="ru">
         <body className={inter.className}>
            <ThemeProvider defaultTheme="system" enableSystem attribute="class">
               <Toaster
                  position="top-right"
                  reverseOrder={true}
                  toastOptions={{
                     style: {
                        background: 'hsl(var(--secondary))',
                        color: 'var(--Main)',
                     },
                  }}
               />

               <LocalSettingsChecker
                  Params={LocalStorageParameters.glowBG}
                  needAlert={true}
                  textAlert={{
                     title: 'Эффект свечения включен',
                     text: 'Если будут наблюдаться проблемы с производительностью вы сможете отключить его в настройках',
                  }}
               >
                  <div className="glow-effect" />
               </LocalSettingsChecker>

               <div id="modal"></div>

               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
