"use client"
import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import React from 'react'
import MessageBox from './messageBox'
import axios from 'axios'


interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(initialMessages);

  const { conversationId } = useConversation();

  React.useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])
  
  return ( 
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}

export default Body;