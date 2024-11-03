"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
//@ts-ignore
import { StoryItemType } from '../dashboard/-components/UserStoryList'
import StoryItemCard from '../dashboard/-components/StoryItemCard'
import { Button } from '@nextui-org/button'
import { ArrowRight } from 'lucide-react'

function ExploreMore() {

    const [offset, setOffset] = useState(0);
    const [storyList, setStoryList] = useState<StoryItemType[]>([]);
    useEffect(() => {
        GetAllStories(0);
    }, [])
    const GetAllStories = async (offset: number) => {
        setOffset(offset);
        const result: any = await db.select().from(StoryData)
            .orderBy(desc(StoryData.id))
            .limit(8)
            .offset(offset);
        setStoryList((prev) => [...prev, ...result])

    }

    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40'>
            <h2 className='font-bold text-5xl text-primary-600 text-center'>Explore More Stories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10'>
                {storyList?.map((item, index) => (
                    <StoryItemCard key={index} story={item} />
                ))}
            </div>
            <div className='text-center mt-10'>
                <Button className='p-7 text-xl bg-gradient-to-r 
            from-purple-600 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-600 
            text-white font-bold shadow-lg 
            hover:no-underline' onClick={() => GetAllStories(offset + 8)}>
                    <span className='relative'>
                        Laod More
                        <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0
              transition-transform duration-300 origin-left group-hover:scale-x-100' />
                    </span>
                    <ArrowRight className='animate-pulse' />
                </Button>
            </div>
        </div>
    )
}

export default ExploreMore