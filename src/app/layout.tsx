
'use client'
import ActiveStatus from './components/activeStatus'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
  }:  {
    children: React.ReactNode
  })  {

    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthContext>
            <ToasterContext/>
            <ActiveStatus/>
            <main className='h-[100vh]'>
              {children}
              <>
              <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden blur-2xl" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#92afff] to-[#3063f0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{
                    clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                }}></div>
              </div>
              </>
            </main>
          </AuthContext>
        </body>
      </html>
    )
}
