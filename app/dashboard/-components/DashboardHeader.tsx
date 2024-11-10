"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@nextui-org/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className='p-4 md:p-7 bg-secondary text-white flex flex-col md:flex-row justify-between items-center'>
      <h2 className='font-bold text-2xl md:text-3xl mb-3 md:mb-0'>My All Stories</h2>
      <div className='flex flex-col md:flex-row gap-3 items-center md:items-center'>
        <div className='flex items-center gap-2'>
          <Image src={'/coin.png'} alt='coin' width={40} height={40} className='w-10 h-10 md:w-12 md:h-12' />
          <span className='text-lg md:text-2xl'>{userDetail?.credit} Credit Left</span>
        </div>
        <Link href={'/buy-credits'}>
          <Button className='bg-gradient-to-r from-purple-900 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-900 text-white font-bold shadow-lg 
            hover:no-underline text-sm md:text-base px-4 py-2 md:px-6 md:py-3'
            color='primary'>
            <span className='relative flex items-center'>
              Buy More Credits
              <ArrowRight className='ml-2 animate-pulse' />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default DashboardHeader