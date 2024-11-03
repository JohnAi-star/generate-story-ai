import Image from 'next/image'
import React from 'react'

function BookCoverPage({imageUrl}:any) {
  return (
    <div>
        <Image src={imageUrl} alt='cover' width={420} height={400} />
    </div>
  )
}

export default BookCoverPage