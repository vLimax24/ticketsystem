import React from 'react'
import CommentSection from './CommentSection'
import StatusSection from './StatusSection'
import AuditLog from './AuditLog'

interface StatusSectionProps {
    id: any; // Adjust the type according to your data type for id
}

const SideSection: React.FC<StatusSectionProps> = ({ id }) => {
  return (
    <div className='flex flex-col mr-10'>
        <StatusSection id={id}/>
        <CommentSection />
        <AuditLog reportId={id}/>
    </div>
  )
}

export default SideSection