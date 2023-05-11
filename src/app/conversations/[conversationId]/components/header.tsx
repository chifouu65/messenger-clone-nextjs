'use client'
import React, { useMemo } from 'react'
import { Conversation, User } from '@prisma/client'
import useOtherUser from '@/app/hooks/useOtherUser';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import Avatar from '@/app/components/avatar';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './profileDrawer';

interface Props {
  conversation: Conversation & {
  users: User[];
  }
}

export default function Header({ conversation }: Props) {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const statusText = useMemo(() => {
      if (conversation.isGroup) {
        return `${conversation.users.length} members`;
      }

      return 'Active'
    }, [conversation])

    return (
      <>
        <ProfileDrawer
          data={conversation}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <div className='
          bg-white
          w-full
          flex
          border-b-[1px]
          lg:px-6
          sm:px-4
          px-4
          py-3
          justify-between
          items-center
          shadow-md
        '>
          <div className="flex w-full gap-3 items-center">
            <Link
              href="/conversations"
              className='
                lg:hidden
                block
                text-gray-500
                hover:text-gray-900
                transition
                cursor-pointer
              '
            >
              <HiChevronLeft size={32}/>
            </Link>
            <Avatar currentUser={otherUser}/>
            <div className='flex flex-col'>
              <div className='font-semibold'>{conversation.name || otherUser?.name}</div>
              <div className='text-sm font-light text-neutral-500'>
                {statusText}
              </div>
            </div>
          </div>
          <HiEllipsisHorizontal 
            onClick={() => setDrawerOpen(true)}
            className='text-gray-500 hover:text-gray-900 transition cursor-pointer'
            size={32}
          />
        </div>
      </>
    )
}
