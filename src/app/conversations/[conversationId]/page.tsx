import React from 'react'

interface Props {
    conversationId: string;
}

export default async function Page({ params }: { params: Props }) {
  return (
    <div>Page</div>
  )
}
