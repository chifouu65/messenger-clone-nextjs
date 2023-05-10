'use client';

import React from 'react'
import clsx from 'clsx';
import useConversation from '../hooks/useConversation';
import EmptyState from '../components/emptyState';

export default function Page() {
    const { isOpen } = useConversation();

    return (
        <div 
            className={clsx(
            'lg:pl-80 h-full lg:block', 
            // @ts-ignore
            isOpen ? 'block' : 'hidden'
          )}>
            <EmptyState />
          </div>
    )
}
