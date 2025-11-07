'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { CourseProgressProvider } from '@/contexts/CourseProgressContext'
import { Toaster } from '@/components/ui/toaster'

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <CourseProgressProvider>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </CourseProgressProvider>
    </QueryClientProvider>
  )
}