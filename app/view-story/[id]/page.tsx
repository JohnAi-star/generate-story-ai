"use client";
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';
import { Button } from '@nextui-org/button';
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { ArrowRight } from 'lucide-react';

function ViewStory({ params }: any) {
  const [story, setStory] = useState<any | null>(null);
  const bookRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getStory();
  }, []);

  const getStory = async () => {
    try {
      const result = await db.select().from(StoryData).where(eq(StoryData.storyId, params.id));
      setStory(result[0] || null);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };

  const handleDownloadStory = () => {
    if (!story) return;

    const storyText = `
Title: ${story.output?.story_cover?.title || "Untitled"}

${story.output?.chapters?.map((chapter: any, index: number) => (
      `Chapter ${index + 1}:\n${chapter.content}\n\n`
    )).join('') || "No content available."}
    `;

    const blob = new Blob([storyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'story.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-6 md:p-10 lg:px-20 flex-col'>
      <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl text-center p-8 bg-secondary text-white'>
        {story.output?.story_cover?.title} - Read Your Story and Download it -
      </h2>

      <div className='relative'>
        {/*@ts-ignore*/}
        <HTMLFlipBook width={420} height={400} showCover={true} className='mt-6 md:mt-10' useMouseEvents={false} ref={bookRef}>
          <div>
            <BookCoverPage imageUrl={story.coverImage} showDownloadButton={false} /> {/* Hide button here */}
          </div>
          {story.output?.chapters?.map((chapter: any, index: number) => (
            <div key={index} className='bg-white border'>
              <StoryPages storyChapter={chapter} />
            </div>
          ))}
        </HTMLFlipBook>

        {/* Navigation Buttons */}
        {count > 0 && (
          <div className='absolute -left-4 top-[250px] md:top-[300px]' onClick={() => {
            //@ts-ignore
            bookRef.current.pageFlip().flipPrev();
            setCount(count - 1);
          }}>
            <FaCircleArrowLeft className='text-[25px] sm:text-[30px] text-secondary cursor-pointer' />
          </div>
        )}
        {count < (story.output?.chapters?.length - 1) && (
          <div className='absolute -right-4 top-[250px] md:top-[300px]' onClick={() => {
            //@ts-ignore
            bookRef.current.pageFlip().flipNext();
            setCount(count + 1);
          }}>
            <FaCircleArrowRight className='text-[25px] sm:text-[30px] text-secondary cursor-pointer' />
          </div>
        )}
      </div>

      {/* Inline Download Buttons */}
      <div className="text-center mt-6 sm:mt-10 flex justify-center space-x-4">
        {/* Download Story Button */}
        <Button
          className='p-4 sm:p-6 text-[16px] sm:text-[18px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg hover:no-underline'>
          <span className='relative'>
            Download Story
            <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100' />
          </span>
          <ArrowRight className='animate-pulse' />
        </Button>

        {/* Download Cover Image Button */}
        <a href={story.coverImage || '/default-cover.jpg'} download="BookCover.jpg">
          <Button
            className='p-4 sm:p-6 text-[16px] sm:text-[18px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg hover:no-underline'>
            <span className='relative'>
              Load Cover Image
              <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100' />
            </span>
            <ArrowRight className='animate-pulse' />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default ViewStory;