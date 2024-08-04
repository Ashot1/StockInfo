import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import packageJSON from '@/../package.json'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
   themeColor: [
      {
         color: '#fafafa',
      },
   ],
   colorScheme: 'light dark',
   userScalable: false,
   maximumScale: 1,
   minimumScale: 1,
   width: 'device-width',
   viewportFit: 'cover',
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
            <Script id="ThemeInitMeta" strategy="beforeInteractive">{`
               let themeStorage = localStorage.getItem('theme')
               const tag = document.querySelector('meta[name="theme-color"]')
               if(!themeStorage || themeStorage === 'system') 
                  themeStorage = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
               
               if (tag)
                  tag.setAttribute('content', themeStorage === 'dark' ? '#121212' : '#fafafa')
            `}</Script>

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
         </body>
      </html>
   )
}
