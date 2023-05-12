'use client'

import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import { User } from '@prisma/client'
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './conversationBox';
import GroupChatModal from './groupChatModal';

interface Props {
  users: User[];
  title: string | undefined
  initialItems: FullConversationType[]
}

export default function ConversationList({users, initialItems, title}: Props) {
  
  const [ items, setItems ] = useState(initialItems)
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const router = useRouter()

  const { conversationId, isOpen} = useConversation()
  
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(`
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between my-4">
            <div className="text-2xl font-bold text-neutral-800">
              Message
            </div>
            <div 
              onClick={() => setIsModalOpen(true)}
              className='
                rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition
              '
            >
              <MdOutlineGroupAdd size={20}/>
            </div>
          </div>
          {
            items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))
          }
        </div>
      </aside>
    </>
  )
}
