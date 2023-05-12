"use client";
import { User } from '@prisma/client'
import Image from 'next/image';
import React from 'react'

interface Props {
  users?: User[];
}

export default function AvatarGroup({users}: Props) {
  const slicedUsers = users?.slice(0, 3);
  const position = {
    0: 'left-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }
  return (
    <div className='relative h-11 w-11'>
      {slicedUsers?.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block
            rounded-full
            overflow-hidden
            w-[21px]
            h-[21px]
            ${position[index as keyof typeof position]}
          `}
        >
          <Image
            src={user.image || '/images/placeholder.jpg'}
            alt='avatar'
            fill
          />
        </div>
      ))}
    </div>
  )
}
