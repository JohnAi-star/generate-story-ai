"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage'
import StoryPages from '../_components/StoryPages'
import LastPage from '../_components/LastPage'
import { Button } from '@nextui-org/button'
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

function ViewStory({ params }: any) {

  const [story, setStory] = useState<any>();
  const bookRef = useRef();
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(params.id)
    getStory();
  }, [])

  const getStory = async () => {
    const result = await db.select().from(StoryData).where(eq(StoryData.storyId, params.id));

    console.log(result[0]);
    setStory(result[0]);
  }

  return (
    <div className='p-10 md:px-20 lg:px-40 flex-col'>
      <h2 className='font-bold text-3xl text-center p-10 bg-secondary text-white'>
        {story?.output?.story_cover?.title} Read Your Story and Download it</h2>
      <div className='relative'>
        {/* @ts-ignore */}
        <HTMLFlipBook width={420} height={400}
          showCover={true}
          className='mt-10'
          useMouseEvents={false}
          ref={bookRef}

        >
          <div>
            <BookCoverPage imageUrl={story?.coverImage} />
          </div>
          {
            [...Array(story?.output?.chapters?.length)].map((item, index) => (
              <div key={index} className='bg-white border'>
                <StoryPages storyChapter={story?.output.chapters[index]} />
              </div>
            ))
          }

        </HTMLFlipBook>
        {count != 0 && <div className='absolute -left-4 top-[250px]' onClick={() => {
          //@ts-ignore
          bookRef.current.pageFlip().flipPrev();
          setCount(count - 1)
        }}>

          <FaCircleArrowLeft className='text-[30px] text-secondary cursor-pointer' />
        </div>}

        {count != (story?.output.chapters?.length - 1) && <div className='absolute -right-4 top-[250px]' onClick={() => {
          //@ts-ignore
          bookRef.current.pageFlip().flipNext();
          setCount(count + 1)
        }}>
          <FaCircleArrowRight className='text-[30px] text-secondary cursor-pointer' />
        </div>}
      </div>

    </div>
  )
}

export default ViewStory