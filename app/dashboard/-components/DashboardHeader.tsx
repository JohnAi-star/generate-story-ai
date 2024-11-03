"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@nextui-org/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {

  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div className='p-7 bg-secondary text-white flex justify-between items-center'>
        <h2 className='font-bold text-3xl '>My All Stories</h2>
        <div className='flex gap-3 items-center'>
            <Image src={'/coin.png'} alt='coin' width={50} height={50} />
            <span className='text-2xl'>{userDetail?.credit} Credit Left</span>
            <Link href={'/buy-credits'}>
            <Button className='bg-gradient-to-r 
            from-purple-900 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-900 
            text-white font-bold shadow-lg 
            hover:no-underline' color='primary'>
              <span className='relative'>
              Buy More Credits
              <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0
              transition-transform duration-300 origin-left group-hover:scale-x-100' />
              </span>
              <ArrowRight className='animate-pulse' />
              </Button>
            </Link>
        </div>
    </div>
  )
}

export default DashboardHeader