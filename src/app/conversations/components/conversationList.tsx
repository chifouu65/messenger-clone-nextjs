import { User } from '@prisma/client'
import React from 'react'

interface Props {
  users: User[];
  title: string;
  initialItems: any;
}

export default function ConversationList({users}: Props) {
  return (
    <div>ConversationList</div>
  )
}
