import React from 'react'

export default function Loading() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>

    </>
  )
}
