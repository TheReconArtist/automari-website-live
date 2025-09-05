import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Automari - AI Automation Agency',
  description: 'Streamline your business operations with Automari\'s specialized AI agents. America\'s most trusted AI automation agency.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
