import type { Metadata } from 'next'
import './globals.css'
import { DemoProvider } from '@/context/demo-context'

export const metadata: Metadata = {
  title: 'Product Operating System',
  description: 'Portfolio AI Accountability Playbook - Vista Product Operating System Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen bg-gray-50">
        <DemoProvider>
          {children}
        </DemoProvider>
      </body>
    </html>
  )
}
