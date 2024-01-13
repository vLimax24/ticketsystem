import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white p-7 mb-0 bottom-0 fixed w-full'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <div className='flex items-center justify-center'>
          <h2 className='text-2xl font-bold mr-5'>Devonit</h2>
          <p className='text-sm'>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div>
          <ul className='flex space-x-6'>
            <li>
              <a href='#' className='hover:text-gray-300 transition duration-300'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-300 transition duration-300'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-300 transition duration-300'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
