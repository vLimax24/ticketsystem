import React from 'react'
import { NavbarLayout, NavbarLogo, NavbarLinks, NavbarDarkMode, NavbarLogin } from '../navbar/index'

const Navbar = () => {
  return (
    <>
        <NavbarLayout>
            <NavbarLogo />
            <NavbarLinks />
            <NavbarDarkMode />
            <NavbarLogin />
        </NavbarLayout>
    </>
  )
}

export default Navbar