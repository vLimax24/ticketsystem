'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { DashboardCard } from './index'

const DashboardTasks = () => {
    const { data: session, status } = useSession()
    if(status === 'loading') {
        return <div>Loading...</div>
    } else if(status === 'authenticated') {
        return (
            <>
                <div>
                    <div>Hello <span>{session?.user?.email}</span></div>
                    <DashboardCard />
                </div>
            </>
        )
    } else {
        return <div>Please Login</div>
    }
}

export default DashboardTasks