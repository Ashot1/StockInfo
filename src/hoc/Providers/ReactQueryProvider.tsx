'use client'

import { FC, ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const ReactQueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
}

export default ReactQueryProvider
