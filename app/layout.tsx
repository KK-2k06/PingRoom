import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PingRoom - Modern Chat Application',
  description: 'A vibrant, Discord-inspired chat app with temporary rooms and emotion-aware messaging',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-chat-bg text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
