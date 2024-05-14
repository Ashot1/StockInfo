import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/hoc/ThemeProvider'
import packageJSON from '@/../package.json'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
   themeColor: [
      { color: '#121212', media: '(prefers-color-scheme: dark)' },
      {
         color: '#fafafa',
         media: '(prefers-color-scheme: light)',
      },
   ],
   colorScheme: 'light dark',
   userScalable: false,
}

export const metadata: Metadata = {
   metadataBase: new URL(process.env.NEXT_PUBLIC_SITEURL as string),
   title: {
      default: 'StockInfo',
      template: '%s | StockInfo',
   },
   appleWebApp: { title: 'StockInfo', startupImage: '/Preview.png' },
   robots: {
      index: true,
      follow: true,
      googleBot: { follow: true, index: true },
   },
   description: packageJSON.description,
   manifest: '/manifest/manifest.json',
   icons: '/icon.png',
   keywords: ['StockInfo', 'Акции', 'Облигации', 'Котировки', 'Валюта'],
   openGraph: {
      title: 'StockInfo',
      description: packageJSON.description,
      images: '/Preview.png',
      locale: 'ru-RU',
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITEURL}/home`,
   },
   twitter: {
      title: 'StockInfo',
      description: packageJSON.description,
      images: '/Preview.png',
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

               <div id="modal"></div>
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}
