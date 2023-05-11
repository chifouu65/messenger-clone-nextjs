"use client";
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import React, { useMemo } from 'react';
import format from 'date-fns/format';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose, IoTrash } from 'react-icons/io5';
import Avatar from '@/app/components/avatar';
import ConfirmModal from '../components/confirmModal';

interface Props {
    onClose: () => void;
    isOpen: boolean;
    data: Conversation & {
      users: User[];
    }
}

export default function ProfileDrawer({ onClose, isOpen, data }: Props) {
  const otherUser = useOtherUser(data)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP')
  }, [ otherUser ]);

  const title = useMemo(() => {
    return data?.name || otherUser?.name
  }, [data?.name ,otherUser?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return 'Active'
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-400'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-400'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div 
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-40"
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel
                    className="pointer-events-auto w-screen max-w-md"
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-lh">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-center justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button 
                            onClick={onClose}
                            className="rounded-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <div className="sr-only">
                                Close panel
                              </div>
                              <IoClose size={32}/>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar currentUser={otherUser} />
                          </div>
                          <div className='font-semibold'>
                            {title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {
                              statusText === 'Active' ? (
                                <div className="text-green-500">
                                  {statusText}
                                </div>
                              ) : (
                                statusText
                              )
                            }
                          </div>
                          <div className="flex gap-10 my-4">
                            <div onClick={() =>setDrawerOpen(true)} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                <IoTrash size={20} className="text-neutral-500"/>
                              </div>
                              <div className='text-sm'>Delete</div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:p-0">
                            <dl className="space-y-6 px-4 sm:space-y-4 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Email address
                                  </dt>
                                  <dd className="mt-1 font-semibold text-sm text-gray-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr/>
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 font-semibold text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>{joinedDate}</time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
 