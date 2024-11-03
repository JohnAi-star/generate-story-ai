"use client"
import React, { useContext, useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
import axios from 'axios'
//@ts-ignore
import uuid4 from "uuid4";
import CustomLoader from './_components/CustomLoader'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { UserDetailContext } from '../_context/UserDetailContext'
import { eq } from 'drizzle-orm'
import { ArrowRight } from 'lucide-react'

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT

export interface fieldData{
  fieldName: string,
  fieldValue: string
}
export interface formDataType{
  storySubject: string,
  storyType: string,
  imageStyle: string,
  ageGroupe: string,
}
function CreateStory() {

  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const {user} = useUser();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  /**
   * used to add data to form
   * @param data 
   */

  const onHandleUserSelection = (data: fieldData) =>{
    setFormData((prev:any) => ({
      ...prev,
      [data.fieldName]:data.fieldValue
    }));
    console.log(formData)
  }

  const GenerateStory = async() => {

    if(userDetail.credit <= 0) {
      notifyError('Oops!, You dont have enough credits, You need to Buy More!')
      return ;
    }

    setLoading(true)
    const FINAL_PROMPT = CREATE_STORY_PROMPT
    ?.replace('{ageGroup}', formData?.ageGroupe??'')
    .replace('{storyType}', formData?.storyType??'')
    .replace('{storySubject}', formData?.storySubject??'')
    .replace('{imageStyle}', formData?.imageStyle??'')
    //Gerate AI Story
      try{
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const story = JSON.parse(result?.response.text().replace(/(})(,?)(\n *\})/g, "$1,"));

        //Generate Image
        const imageResp = await axios.post('/api/generate-image', {
          prompt:'Add text with title:' + story?.story_cover?.title + 
          " in bold text for book cover, " + story?.story_cover?.image_prompt
        })

        const AiImageUrl = imageResp?.data?.imageUrl

        const imageResult = await axios.post('/api/save-image', {
          url:AiImageUrl
        });

        const FirebaseStorageImageUrl = imageResult.data.imageUrl;

        const resp:any = await SaveInDB(result?.response.text(), FirebaseStorageImageUrl);
        console.log(resp);
        notify("Story generated")
        await UpdateUserCredits();
        router?.replace('/view-story/' + resp[0].storyId)
        setLoading(false);
       }catch(e){
        console.log(e)
        notifyError('Server Error, Try again!')
        setLoading(false);
      }
    
  }

  const SaveInDB = async(output:string, imageUrl:string) => {
    const recordId = uuid4();
    setLoading(true)
    try{
      const result = await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.ageGroupe,
        imageStyle:formData?.imageStyle,
        storySubject:formData?.storySubject,
        StoryType:formData?.storyType,
        output:JSON.parse(output),
        coverImage:imageUrl,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userImage:user?.imageUrl,
        userName:user?.fullName
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    }
    catch(e)
    {
      setLoading(false);
    }
  }

  const UpdateUserCredits = async() => {
    const result = await db.update(Users).set({
      credit:Number (userDetail?.credit-1)
    }).where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress??''))
    .returning({id:Users.id})
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[55px] text-primary-600 text-center'>CREATE YOUR STORY</h2>
      <p className='text-xl text-primary-600 text-center'>Unlock your creativity with AI through StoryCraft, the ultimate tool for parents and teachers to generate personalized, fun stories for kids. With customizable characters and themes, storytelling becomes engaging, easy, and educational.</p>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject */}
          <StorySubjectInput userSelection = {onHandleUserSelection} />
        {/* Story kind */}
          <StoryType userSelection = {onHandleUserSelection} />
        {/* Age Group */}
          <AgeGroup userSelection = {onHandleUserSelection} />
        {/* Image Style */}
          <ImageStyle userSelection = {onHandleUserSelection} />
      </div>

      <div className='flex justify-center my-10 pt-7 flex-col items-center'>
        <Button disabled={loading} 
        className='p-7 text-xl bg-gradient-to-r 
            from-purple-600 to-indigo-600 
            hover:from-indigo-600 hover:to-purple-600 
            text-white font-bold shadow-lg 
            hover:no-underline' onClick={GenerateStory}>
              <span className='relative'>
              Generate Story
              <ArrowRight className='absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0
              transition-transform duration-300 origin-left group-hover:scale-x-100' />
              </span>
              <ArrowRight className='animate-pulse' />
              </Button>
              <span>1 Credit will use</span>
      </div>
      <CustomLoader isLoading = {loading} />
    </div>
  )
}

export default CreateStory