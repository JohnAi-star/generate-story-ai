import Image from 'next/image';
import React, { useState } from 'react'
import { OptionField } from './StoryType';

function AgeGroup({userSelection}:any) {
    const OptionList = [
        {
            label: '0-3 Years',
            imageUrl: '/0-2years.png',
            isFree: true
        },
        {
            label: '3-6 Years',
            imageUrl: '/3-6years.png',
            isFree: true
        },
        {
            label: '6-8 Years',
            imageUrl: '/6-8years.png',
            isFree: true
        }
    ]

    const[selectedOption, setSelectedOption] = useState<string>();

    const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.label);
        userSelection({
            fieldValue: item?.label,
            fieldName: 'ageGroup'
        })
    }

  return (
    <div>
        <label className='font-bold text-3xl text-primary-600'>3. Age Group</label>
        <div className='grid grid-cols-3 gap-5 mt-3'>
            {OptionList.map((item, index) => (
                <div className={`relative grayscale hover:grayscale-0 
                cursor-pointer p-1
                ${selectedOption == item.label?'grayscale-0 border-2 rounded-3xl border-secondary' : 'grayscale'}
                `} onClick={() => onUserSelect(item)}>
                    <h2 className='absolute bottom-5 text-xl
                    text-white text-center w-full'>{item.label}</h2>
                    <Image src={item.imageUrl} alt={item.label} 
                    width={300} height={500} 
                    className='object-cover h-[260px] rounded-3xl'
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default AgeGroup