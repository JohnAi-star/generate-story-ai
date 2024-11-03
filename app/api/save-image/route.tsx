import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const data = await req.json();
        const { url } = data;
    
        // Convert image to base64 (without 'data:image/png;base64,' prefix)
        const base64Image = await convertImage(url);
    
        if (!base64Image) {
          throw new Error('Failed to convert image to base64');
        }
    
        // Prepare the filename and reference for Firebase Storage
        const fileName = '/ai-story/' + Date.now() + ".png";
        const imageRef = ref(storage, fileName);
    
        // Upload to Firebase Storage (without base64 prefix)
        await uploadString(imageRef, base64Image, 'base64');
        console.log('File Uploaded');
    
        // Get download URL from Firebase Storage
        const downLoaderUrl = await getDownloadURL(imageRef);
        console.log(downLoaderUrl);
    
        return NextResponse.json({ imageUrl: downLoaderUrl });
    
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.error();
      }
}

export const convertImage = async(imageUrl:string) => {
    try{
        const response = await axios.get(imageUrl, {responseType:'arraybuffer'});
        const base64Image = Buffer.from(response.data).toString('base64');
        return base64Image;
    }catch(e)
    {
        console.log("Error converting base 64 image", e)
        return null;
    }
}