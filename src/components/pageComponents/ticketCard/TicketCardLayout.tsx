import React, { ReactNode } from 'react'

interface TicketCardLayoutProps {
    children: ReactNode;
}

const TicketCardLayout: React.FC<TicketCardLayoutProps> = ({ children }) => {
  return (
    <div className='grid place-items-center mt-10'>
        {children}
    </div>
  )
}

export default TicketCardLayout