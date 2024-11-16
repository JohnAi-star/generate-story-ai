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

    const { user, isSignedIn } = useUser();
    const MenuList = [
        { name: 'Home', path: '/' },
        { name: 'Create Story', path: '/create-story' },
        { name: 'Explore Stories', path: '/explore' },
        { name: 'Pricing', path: '/buy-credits' },
        { name: 'Contact', path: '/contact' }
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} className="w-full">
            {/* Left side - logo and menu toggle for mobile */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open Menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="flex items-center">
                    <Image src="/logo.svg" alt="logo" width={30} height={30} />
                    <h2 className="font-bold text-xl text-secondary ml-3">Story Craft</h2>
                </NavbarBrand>
            </NavbarContent>

            {/* Centered nav items - visible on medium screens and up */}
            <NavbarContent justify="center" className="hidden sm:flex">
                {MenuList.map((item, index) => (
                    <NavbarItem key={index} className="text-lg md:text-xl text-secondary font-medium hover:underline mx-2">
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right side - "Get Started"/Dashboard button and User Button */}
            <NavbarContent justify="end">
                <Link href="/dashboard">
                    <Button className="px-4 py-2 sm:px-2 sm:py-1 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg">
                        {isSignedIn ? 'Dashboard' : 'Get Started'}
                    </Button>
                </Link>
                <UserButton />
            </NavbarContent>

            {/* Mobile Menu - dropdown items visible only on smaller screens */}
            <NavbarMenu className="sm:hidden">
                {MenuList.map((item, index) => (
                    <NavbarMenuItem key={index} className="p-2">
                        <Link href={item.path} className="text-lg font-medium">
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Header;