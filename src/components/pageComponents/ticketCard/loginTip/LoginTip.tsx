import { Lightbulb } from 'lucide-react'
import { useSession } from 'next-auth/react'

import React from 'react'

const LoginTip = () => {
    const { data: session, status } = useSession()
    if(status === 'unauthenticated') {
        return (
            <div className='flex pr-1.5 pl-4 py-3 bg-yellow-300 bg-opacity-40 border-2 rounded-md border-yellow-400 items-center'>
            <Lightbulb size={20}/>
            <div className='ml-2'>Login to recieve status updates about your report!</div>
            </div>
        )
    }
}

export default LoginTip