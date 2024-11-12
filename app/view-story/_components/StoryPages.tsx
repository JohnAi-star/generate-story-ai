import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { MdPlayCircleFilled, MdStopCircle } from "react-icons/md";

interface StoryChapter {
  chapter_title: string;
  description: string;
}

function StoryPages({ storyChapter }: { storyChapter: StoryChapter }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSpeech = (text: string) => {
    if (!text) return; // Prevent TTS if text is empty
    if (window?.speechSynthesis) {
      const synth = window.speechSynthesis;
      const textToSpeech = new SpeechSynthesisUtterance(text);

      textToSpeech.onstart = () => setIsPlaying(true);
      textToSpeech.onend = () => setIsPlaying(false);

      synth.speak(textToSpeech);
    } else {
      alert("Speech synthesis is not supported in your browser.");
    }
  };

  const stopSpeech = () => {
    if (window?.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleDownload = () => {
    const chapterContent = `
      Chapter: ${storyChapter?.chapter_title}
      \n\nDescription: ${storyChapter?.description}`;

    const blob = new Blob([chapterContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${storyChapter?.chapter_title}.txt`;
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold text-primary flex justify-between">
        {storyChapter?.chapter_title}
        <div className="flex space-x-2">
          <span
            className="text-3xl cursor-pointer"
            onClick={() => playSpeech(storyChapter?.description)}
            aria-label="Play description"
          >
            <MdPlayCircleFilled />
          </span>
          {isPlaying && (
            <span
              className="text-3xl cursor-pointer"
              onClick={stopSpeech}
              aria-label="Stop description"
            >
              <MdStopCircle />
            </span>
          )}
        </div>
      </h2>
      <p className="text-lg p-10 mt-3 rounded-lg bg-slate-300">{storyChapter?.description}</p>
      
      {/* Download Button */}
      <div className="text-center mt-5">
        <Button onClick={handleDownload}>Download Chapter</Button>
      </div>
    </div>
  );
}

export default StoryPages;