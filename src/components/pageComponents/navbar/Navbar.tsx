import React from 'react'
import { NavbarLayout, NavbarLogo, NavbarLinks, NavbarDarkMode, NavbarLogin } from '../navbar/index'

const Navbar = () => {
  return (
    <>
        <NavbarLayout>
            <NavbarLogo />
            <NavbarLinks />
            <div className='flex'>
              <NavbarLogin />
              <NavbarDarkMode />
            </div>
        </NavbarLayout>
    </>
  )
}

export default Navbar