import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='mx-auto flex max-w-[980px] flex-col items-center justify-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 scale-125'>
        <h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]'>
            Ever had a bug on your Website?
        </h1>
        <h2 className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'>Then this is the place to report it!</h2>
        <div className='flex mt-10'>
            <Link href={'/report'}>
                <Button className='mx-2'>
                    Report an Issue
                </Button>
            </Link>
            <Link href={'/dashboard'}>
                <Button className='mx-2' variant={'outline'}>
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero