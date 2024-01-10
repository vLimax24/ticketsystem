import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.svg'
import Link from 'next/link'

const NavbarLogo = () => {
  return (
    <>
        <Link href={'/'}>
            <Image src={logo} alt='logo' width={40} height={40}/>
        </Link>
    </>
  )
}

export default NavbarLogo