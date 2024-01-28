'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { DashboardCard } from './index'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const DashboardTasks = () => {
    const { data: session, status } = useSession()
    if(status === 'loading') {
        return <div className='ml-10'>Loading...</div>
    } else if(status === 'authenticated') {
        return (
            <>
                <div>
                    <DashboardCard />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='flex justify-center items-center flex-col mt-[10rem]'>
                    <h1 className='text-[32px] mb-10'>Please <strong>Login</strong> to continue</h1>
                    <div className='flex gap-5'>
                        <Link href={'/auth/login'}>
                            <Button className='w-[10rem]'>Sign In</Button>
                        </Link>
                        <Link href={'/'}>
                            <Button className='w-[10rem]'>Home</Button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default DashboardTasks