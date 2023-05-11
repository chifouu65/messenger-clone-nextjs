"use client";
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { tr } from 'date-fns/locale';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './messageInput';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter()
  const { conversationId} = useConversation()
  const { register, handleSubmit, setValue, formState: { errors }}
  = useForm<FieldValues>({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div className='
      p-4
      bg-white
      border-t
      flex
      items-center
      space-x-2
      lg:space-x-4
      w-full
    '>
      <div className='rounded-full
        bg-blue-500
        hover:bg-blue-600
        text-white
        p-2
        w-10
        h-10
        flex
        items-center
        justify-center'
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset='zhed3thj'
        >
          <HiPhoto size={30}/>
        </CldUploadButton>
      </div>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center space-x-2 lg:space-x-4 w-full'
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button type="submit" className="
          rounded-full
          bg-blue-500
          hover:bg-blue-600
          text-white
          p-2
          w-10
          h-10
          flex
          items-center
          justify-center
        ">
          <HiPaperAirplane 
          className='text-white'
          size={30}/>
        </button>
      </form>
    </div>
  )
}
