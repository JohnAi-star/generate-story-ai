import { Button } from '@nextui-org/button';
import Image from 'next/image';
import React from 'react';

function BookCoverPage({ imageUrl }: { imageUrl: string }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = "cover-image.jpg";
    link.click();
  };

  return (
    <div className="w-full">
      <Image
        src={imageUrl}
        alt="Book Cover"
        width={420}
        height={400}
        className="w-full h-auto"
      />
      
      {/* Download Button */}
      <div className="text-center mt-5">
        <Button onClick={handleDownload}>Download Cover Image</Button>
      </div>
    </div>
  );
}

export default BookCoverPage;