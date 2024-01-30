'use client'

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import login from '../../../../public/login.svg'
import { Github } from 'lucide-react'
import google from '../../../../public/google.svg'
import { useRouter } from 'next/navigation'

const AuthenticationPage = () => {
    const { data: session, status} = useSession()
    const router = useRouter();

    const handleSignIn = async (provider: string) => {
        const result = await signIn(provider);
      };

    if ( status === 'authenticated') {
        router.push('/dashboard');
    }
    return (
        <div className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="w-full space-y-8 flex">
                <div className='w-1/2 ml-40'>

                <Image 
                    src={login}
                    alt="login"
                    width={500}
                    height={500}
                    className='mt-20'
                />
                </div>
                <div className="space-y-6 flex flex-col items-center justify-center w-1/2">
                    <h1 className="text-xl md:text-[1.2rem] lg:text-[2.4rem] font-bold h-fit mb-5">Sign in to your account</h1>
                                        <button
                        onClick={() => handleSignIn('github')}
                        className="w-1/2 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <Github size={20} className='mr-3'/>
                        Sign in with GitHub
                    </button>
                    <button
                        onClick={() => handleSignIn('google')}
                        className="w-1/2 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <Image 
                            src={google}
                            alt="google"
                            width={20}
                            height={20}
                            className='mr-3'
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationPage
