import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyProvider from './providers/MyProvider'
import SnackBar from './components/snackbar/SnackBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MyProvider>
        <body className={inter.className}>
          {children}
          <SnackBar />
        </body>
      </MyProvider>
    </html>
  )
}
