'use client'

import React, { useState } from 'react';
import { NavbarLayout, NavbarLogo, NavbarLinks, NavbarDarkMode, NavbarLogin } from '../navbar/index';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <NavbarLayout>
        <NavbarLogo />
        <div className='hidden md:flex'>
          <NavbarLinks />
        </div>
        <div className='flex'>
          <div className='hidden md:flex'>
            <NavbarLogin />
          </div>
          <div className='hidden md:flex'>
            <NavbarDarkMode />
          </div>
        </div>
        <div onClick={toggleSidebar} className='flex md:hidden'>
          <Menu size={20} />
        </div>
      </NavbarLayout>
      {sidebarOpen && (
        <div className='fixed inset-0 flex z-50'>
          <div className='fixed inset-0 bg-black' onClick={toggleSidebar}></div>
          <div className='flex-none w-64 bg-white shadow-xl transform transition-transform ease-in-out duration-300 -translate-x-full md:relative md:translate-x-0'>
            {/* Sidebar content */}
            <nav className='p-4'>
              <ul>
                {/* Add your sidebar links here */}
                <li>
                  <a href='#' className='block py-2 px-4 hover:bg-gray-200'>Link 1</a>
                </li>
                <li>
                  <a href='#' className='block py-2 px-4 hover:bg-gray-200'>Link 2</a>
                </li>
                {/* Add more links as needed */}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
