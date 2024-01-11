import React, { ReactNode } from 'react';

interface NavbarLayoutProps {
  children: ReactNode;
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <div className='w-full px-10 py-5 flex justify-between items-center mb-10'>
      {children}
    </div>
  );
};

export default NavbarLayout;
