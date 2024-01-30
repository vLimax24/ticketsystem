'use client'

import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

const NavbarLogin = (): JSX.Element => {
    const { data: session, status }: { data: any, status: string } = useSession()
    
    if (status === "authenticated") {
        return (
          <div className="flex gap-5 mr-10">
            <Link href={'/dashboard'}>
              <Image
                src={session?.user?.image}
                alt='Logo'
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <Button variant={'outline'} onClick={() => signOut()}>Sign Out</Button>
          </div>
        );
      }
    
      return (
        <Link href={'/auth/login'}>
          <Button className='mr-10'>Sign In</Button>
        </Link>
        
      )
}

export default NavbarLogin