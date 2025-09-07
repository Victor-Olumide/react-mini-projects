import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 text-3xl font-bold'>
      <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
        <h1>sorry the page does not exist</h1>
    </div>
  )
}
