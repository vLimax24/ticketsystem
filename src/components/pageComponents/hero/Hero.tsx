import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 md:scale-125 px-2'>
        <h1 className='text-center text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl xl:text-[4.5rem] lg:leading-[1.1] whitespace-normal flex-wrap'>
            Have a bug on your Website?
        </h1>
        <h2 className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'>Then this is the place to report it!</h2>
        <div className='flex mt-10 flex-col md:flex-row w-full px-3 md:justify-center md:items-center '>
            <Link href={'/report'} className="mr-3">
                <Button className='w-full my-1 md:mx-2'>
                    Report an Issue
                </Button>
            </Link>
            <Link href={'/dashboard'}>
                <Button className='w-full my-1 md:mx-2' variant={'outline'}>
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero