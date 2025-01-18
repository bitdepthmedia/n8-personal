import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Nate Talbot - The Business Behind Your Business',
  description: 'Personal website of Nate Talbot, business consultant and technology expert.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

