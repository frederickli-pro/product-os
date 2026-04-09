import type { Metadata, Viewport } from 'next'
import './globals.css'
import { DemoProvider } from '@/context/demo-context'
import { AnalyticsProvider } from '@/components/analytics/analytics-provider'

export const metadata: Metadata = {
  title: 'Product Operating System',
  description: 'Portfolio AI Accountability Playbook - Vista Product Operating System Demo',
  robots: 'index, follow',
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ? `https://${process.env.NEXT_PUBLIC_DOMAIN}` : 'http://localhost:3000'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0D2847',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-gray-50">
        <AnalyticsProvider>
          <DemoProvider>
            {children}
          </DemoProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
