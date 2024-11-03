import React from 'react'
import { MdPlayCircleFilled } from "react-icons/md";

function StoryPages({storyChapter}:any) {

  const playSpeech = (text:string) =>{
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  }
  return (
    <div>
        <h2 className='text-2xl text-center font-bold text-primary flex justify-between'>{storyChapter?.chapter_title}
          <span className='text-3xl cursor-pointer' onClick={() => playSpeech(storyChapter?.description)}><MdPlayCircleFilled /></span>
        </h2>
        <p className='text-lg p-10 mt-3 rounded-lg bg-slate-300'>{storyChapter?.description}</p>
    </div>
  )
}

export default StoryPages