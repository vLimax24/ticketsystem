'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

const AuthenticationPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <div className="space-y-6">
                    <button
                        onClick={() => signIn('github')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign in with GitHub
                    </button>
                    <button
                        onClick={() => signIn('google')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => signIn('email')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in with Email
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationPage
