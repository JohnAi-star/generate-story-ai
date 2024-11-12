import { Button } from "@nextui-org/button";
import React from "react";

function LastPage() {
  const handleShare = () => {
    console.log("Story shared!"); // Replace with actual share logic
  };

  const handleDownload = () => {
    const lastPageContent = `
      End of Story
      \n\nCongratulations on finishing the story! Thank you for reading.`;

    const blob = new Blob([lastPageContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "End_of_Story.txt";
    link.click();
  };

  return (
    <div className="bg-primary p-10 h-full">
      <h2 className="text-center text-2xl text-white">End of Story</h2>
      <div className="flex items-center justify-center">
        <Button onClick={handleShare} aria-label="Share this story">Share Story</Button>
      </div>
      
      {/* Download Button */}
      <div className="text-center mt-5">
        <Button onClick={handleDownload}>Download Story</Button>
      </div>
    </div>
  );
}

export default LastPage;