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
      <div
        className={`${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } fixed top-0 left-0 h-full w-full bg-primary transition-transform duration-500 ease-in-out overflow-hidden text-[#FFF] z-[999999]`}
      >
        <div className="flex justify-end p-4 transition-all duration-300 mr-3">
          <button className="text-black font-bold text-[32px] hover:rotate-[90deg] transition-all duration-500" onClick={toggleSidebar}>
            &#10006;
          </button>
        </div>
        <ul className="flex flex-col items-end mr-4">
          <li className="m-3">
            <a href="#" className="text-[3em] text-black font-black">
              About
            </a>
          </li>
          <li className="m-3">
            <a href="#" className="text-[3em] text-black font-black">
              Projects
            </a>
          </li>
          <li className="m-3">
            <a href="#" className="text-[3em] text-black font-black">
              Contact
            </a>
          </li>
          <li className="m-3">
            <a href="#" className="text-[3em] text-black font-black">
              Techstack
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
