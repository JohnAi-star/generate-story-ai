import { Button } from "@nextui-org/button";
import React from "react";

function LastPage() {
  return (
    <div className="bg-primary p-10 h-full">
      <h2 className="text-center text-2xl text-white">End of Story</h2>
      <div className="flex items-center justify-center">
        <Button>Share Story</Button>
      </div>
    </div>
  );
}

export default LastPage;