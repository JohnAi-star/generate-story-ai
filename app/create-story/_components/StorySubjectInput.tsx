import { Textarea } from '@nextui-org/input'
import { input } from '@nextui-org/theme'
import React from 'react'

function StorySubjectInput({userSelection}:any) {
  return (
    <div>
        <label className='font-bold text-3xl text-primary-600'>1. Subject of the story</label>
        <Textarea 
        placeholder='Write the subjectof the story as you want to generate' 
        size='lg'
        classNames={{
            input:"resize-y min-h-[230px] text-xl p-5"
        }}
        className='mt-3  max-w-lg'
        onChange={(e) => userSelection({
            fieldValue:e.target.value,
            fieldName:'storySubject'
        })}
        />
    </div>
  )
}

export default StorySubjectInput