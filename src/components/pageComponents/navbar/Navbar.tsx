import React from 'react'
import { NavbarLayout, NavbarLogo, NavbarLinks, NavbarDarkMode } from '../navbar/index'

const Navbar = () => {
  return (
    <>
        <NavbarLayout>
            <NavbarLogo />
            <NavbarLinks />
            <NavbarDarkMode />
        </NavbarLayout>
    </>
  )
}

export default Navbar