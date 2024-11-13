import { Button } from '@nextui-org/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface BookCoverPageProps {
  imageUrl: string;
  showDownloadButton?: boolean; // New prop to control button display
}

function BookCoverPage({ imageUrl, showDownloadButton = true }: BookCoverPageProps) {
  const downloadImageUrl = imageUrl || '/default-cover.jpg';

  return (
    <div className="text-center">
      <Image src={downloadImageUrl} alt='Book cover image' width={420} height={400} className="mx-auto" />
      {showDownloadButton && (
        <div className="mt-6 sm:mt-10 text-center">
          <a href={downloadImageUrl} download="BookCover.jpg">
            <Button
              className='p-4 sm:p-6 text-[16px] sm:text-[18px] bg-gradient-to-r 
              from-purple-600 to-indigo-600 
              hover:from-indigo-600 hover:to-purple-600 
              text-white font-bold shadow-lg 
              hover:no-underline'>
              <span className='relative'>
                Load Cover Image
                <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0
                  transition-transform duration-300 origin-left group-hover:scale-x-100' />
              </span>
              <ArrowRight className='animate-pulse' />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default BookCoverPage;