'use client'

import { NextUIProvider } from '@nextui-org/react'
import SingIn from '../components/SingIn'
import SingUp from '../components/SingUp'
// import Image from 'next/image'

// const sizes = ['sm', 'md', 'lg']

const Home = () => {
  const token = localStorage.getItem('token')

  return (
    <NextUIProvider>
      <div className='h-[calc(100vh-48px)] p-2 rounded-lg flex items-center justify-center'>
        <div className='w-full h-full flex items-end justify-end'>
          {!token &&
            <div className='flex gap-4 m-4'>
              <SingIn />
              <SingUp />
            </div>}
        </div>
      </div>
    </NextUIProvider>
  )
}

export default Home
