import { Button } from '@nextui-org/button';
import React from 'react';

const LastPage: React.FC = () => {
  const handleShare = () => {
    // Logic to share the story, for example:
    alert('Sharing the story...');
  };

  return (
    <div className="bg-primary p-10 h-full">
      <h2 className="text-center text-2xl md:text-3xl text-white">End of Story</h2>
      <div className="flex items-center justify-center">
        <Button onClick={handleShare} aria-label="Share your story">
          Share Story
        </Button>
      </div>
    </div>
  );
};

export default LastPage;
