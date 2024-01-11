'use client'

import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { Button, ButtonProps } from "@/components/ui/button"
import Image from 'next/image'

const NavbarLogin = (): JSX.Element => {
    const { data: session, status }: { data: any, status: string } = useSession()
    console.log("session:", session)
    console.log("status:", status)
    
    if (status === "authenticated") {
        return (
          <div className="flex gap-5">
            <Image
              src={session.user.image}
              alt='Logo'
              width={40}
              height={40}
              className="rounded-full"
            />
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        );
      }
    
      return <Button onClick={() => signIn("github")}>Sign In</Button>;
}

export default NavbarLogin