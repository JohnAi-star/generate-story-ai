import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, MoveRight, Star } from 'lucide-react';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Social Icons

// Sample client reviews data with images
const reviews = [
  {
    id: 1,
    name: 'John Doe',
    review: 'This platform is simply amazing! I created a story in minutes.',
    rating: 5,
    image: '/client1.png'
  },
  {
    id: 2,
    name: 'Jane Smith',
    review: 'I love this platform, A brilliant way to inspire creativity for my kids.',
    rating: 4,
    image: '/client2.png'
  },
  {
    id: 3,
    name: 'Sam Wilson',
    review: 'A fun experience for the whole family. Highly recommend it!',
    rating: 5,
    image: '/client3.png'
  },
];

function Hero() {
  return (
    <div className='px-10 md:px-20 lg:px-44 sm:h-full md:h-full lg:h-full flex flex-col items-center justify-center -translate-y-5'>
      {/* Centered Text Section */}
      <div className='text-center'>
        <h2 className='text-[50px] text-primary-600 font-extrabold py-4'>
          Craft Endless Adventures in Minutes
        </h2>
        <p className='text-[18px] text-primary font-light mb-6'>
          Create a magical story that can embark on limitless adventures and spark passion, 
          turning simple ideas into magical tales that inspire creativity, learning, and fun. 
          It only takes a few seconds!
        </p>

        {/* Centered Button */}
        <Link href={'/create-story'}>
          <Button
            size='lg'
            color='primary'
            aria-label='Create Story'
            className='text-xl p-7 bg-gradient-to-r from-purple-600 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg'
          >
            <span className='relative'>
              Create Story
              <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 
              transition-transform duration-300 origin-left group-hover:scale-x-100' />
            </span>
            <ArrowRight className='animate-pulse' />
          </Button>
        </Link>
      </div>

      {/* Images Section */}
      <div className='flex flex-col md:flex-row items-center justify-center md:space-y-0 md:space-x-4 lg:space-x-52 mt-10'>
        <Image
          src={'/story-2.png'}
          alt='Story Image 1'
          width={700}
          height={400}
          className='w-full md:w-[250px] object-cover'
        />
        <MoveRight
          size={100}
          strokeWidth={1}
          className='text-purple-600 mx-4 block'
        />
        <Image
          src={'/story-3.png'}
          alt='Story Image 2'
          width={700}
          height={400}
          className='w-full md:w-[250px] object-cover'
        />
      </div>

      {/* Client Reviews Section */}
      <div className='mt-16 w-full'>
        <h3 className='text-3xl font-semibold text-center text-primary-600 mb-10'>
          What Our Clients Say
        </h3>
        <div className='flex flex-col md:flex-row justify-center items-center md:space-x-16'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='bg-secondary shadow-lg p-6 rounded-lg max-w-xs md:max-w-md mb-6 md:mb-0'
            >
              {/* Client Image */}
              <div className='w-20 h-20 mb-4 mx-auto'>
                <Image
                  src={review.image}
                  alt={`${review.name} profile`}
                  width={80}
                  height={80}
                  className='rounded-full object-cover'
                />
              </div>

              {/* Star Rating */}
              <div className='flex items-center justify-center mb-4'>
                {Array(review.rating)
                  // @ts-ignore
                  .fill()
                  .map((_, i) => (
                    <Star key={i} className='text-yellow-500' />
                  ))}
              </div>

              {/* Client Name and Review */}
              <p className='text-2xl font-medium text-black mb-2 text-center'>
                {review.name}
              </p>
              <p className='text-white text-center'>{review.review}</p>
            </div>
          ))}
        </div>
        <Link href={'/create-story'}>
          <Button
            size='lg'
            color='primary'
            aria-label='Create Story'
            className='text-xl mt-10 justify-center items-center p-7 bg-gradient-to-r from-purple-600 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg'
          >
            <span className='relative'>
              Create One
              <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 
              transition-transform duration-300 origin-left group-hover:scale-x-100' />
            </span>
            <ArrowRight className='animate-pulse' />
          </Button>
        </Link>
      </div>
      {/* Footer Section */}
      <footer className='w-screen bg-[#619bc2] text-white py-10 mt-16'>
        <div className='flex flex-col md:flex-row justify-between items-center px-10 md:px-20'>
          {/* Logo with Title */}
          <div className='flex items-center space-x-4 mb-6 md:mb-0'>
            <Image src='/logo.svg' alt='Logo' width={50} height={50} />
            <h2 className='text-4xl text-secondary font-bold'>Story Craft</h2>
          </div>

          {/* Navigation Links */}
          <div className='flex space-x-6 text-xl'>
            <Link href='/' className='text-secondary'>Home</Link>
            <Link href='/create-story'>Create Story</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
          </div>

          {/* Social Media Links */}
          <div className='flex space-x-6 mt-6 md:mt-0'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <Facebook size={24} className='hover:text-blue-500' />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <Twitter size={24} className='hover:text-blue-400' />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <Instagram size={24} className='hover:text-pink-500' />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;
