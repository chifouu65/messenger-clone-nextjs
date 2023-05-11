'use client'
import Avatar from '@/app/components/avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    isLast?: boolean;
    data: FullMessageType
}

export default function MessageBox({isLast, data} : Props) {
  const session = useSession()
  const isOwn = session?.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
  .filter((user) => user.email !== data?.sender?.email)
  .join(', ')

  const container = clsx(
    'flex gap-3 p-4',
    isOwn && 'justify-end',
  )
  const avatar = clsx(isOwn && "order-2")
  const body = clsx(
    'flex flex-col gap-2',
    isOwn && 'items-end' 
  );
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
    data?.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar currentUser={data?.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data?.sender?.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data?.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data?.image ? (
           <Link
            target='_blank'
            href={data?.image}
            rel="noopener noreferrer"
            >
              <Image
                src={data?.image}
                width={288}
                height={288}
                alt="message image"
                className='
                  object-cover
                  cursor-pointer
                  hover:scale-110
                  transition
                  translate
                '
              />
            </Link>
          )
          :
          (
            <div>
              {data?.body}
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}
