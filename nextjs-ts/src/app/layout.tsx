import './globals.css'
import TopMenu from '@/UIElements/TopMenu'
import SideMenu from '@/UIElements/SideMenu'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flexmonster Next App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="app">
          <TopMenu />
          <div className="wrap">
            <SideMenu />
            <div className="pivot-example-container">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}   