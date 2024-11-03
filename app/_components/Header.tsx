"use client"
import React, { useState } from 'react'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs'

function Header() {

    const {user, isSignedIn} = useUser();
    const MenuList= [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Create Story',
            path: '/create-story'
        },
        {
            name: 'Explore Stories',
            path: '/explore'
        },
        {
            name: 'Pricing',
            path: '/buy-credits'
        },
        {
            name: 'Contact',
            path: '/contact'
        },
]
const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle 
                aria-label={isMenuOpen?"Close menu": "Open Menu"}
                className='sm:hidden'
            />
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className='font-bold text-2xl text-secondary ml-3'>Story Craft</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item, index) => (
                <NavbarItem className='text-xl text-secondary font-medium 
                hover:underline mx-2'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
            <Button className='bg-gradient-to-r 
            from-purple-600 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-600 
            text-white font-bold shadow-lg 
            hover:no-underline'>
                {isSignedIn?
                'Dashboard':
                'Get Started'    
            }
            </Button>
            </Link>
            <UserButton />
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item, index) => (
                <NavbarMenuItem>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header