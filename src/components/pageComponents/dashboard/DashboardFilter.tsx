import React from 'react';
import { Label } from '@/components/ui/label';
import Dropdown from './Dropdown';

interface DashboardFilterProps {
  onFilterChange: (filterType: string, value: string) => void;
}

const DashboardFilter: React.FC<DashboardFilterProps> = ({ onFilterChange }) => {
  const handleStatusChange = (selectedStatus: string) => {
    onFilterChange('status', selectedStatus);
  };

  const handleRelevanceChange = (selectedRelevance: string) => {
    onFilterChange('relevance', selectedRelevance);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className='flex flex-col'>
        <Label htmlFor="status" className='mb-2'>Status</Label>
        {/* Dropdown or other UI element for selecting status */}
        {/* Example using a hypothetical Dropdown component */}
        <Dropdown onChange={handleStatusChange} options={['All', 'PENDING', 'PROGRESS', 'HOLD', 'CANCELLED', 'COMPLETED', 'INITIATED']} />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor="relevance" className='mb-2'>Relevance</Label>
        {/* Dropdown or other UI element for selecting relevance */}
        {/* Example using a hypothetical Dropdown component */}
        <Dropdown onChange={handleRelevanceChange} options={['All', 'critical', 'high', 'major', 'medium', 'low', 'minor', 'trivial']} />
      </div>
    </div>
  );
};

export default DashboardFilter;
