import React, { ReactNode } from 'react';

interface NavbarLayoutProps {
  children: ReactNode;
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <div className='w-full px-10 py-10 flex justify-between items-center'>
      {children}
    </div>
  );
};

export default NavbarLayout;
