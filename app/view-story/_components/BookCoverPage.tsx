import Image from 'next/image';
import React from 'react';

function BookCoverPage({ imageUrl }: any) {
  return (
    <div className="w-full">
      <Image
        src={imageUrl}
        alt="cover"
        width={420}
        height={400}
        className="w-full h-auto"
      />
    </div>
  );
}

export default BookCoverPage;