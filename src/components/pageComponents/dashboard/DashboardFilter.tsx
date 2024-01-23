import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { Delete } from 'lucide-react'

interface DashboardFilterProps {
  onFilterChange: (filterType: string, value: string) => void;
}

const DashboardFilter: React.FC<DashboardFilterProps> = ({ onFilterChange }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [relevanceFilter, setRelevanceFilter] = useState('All');

  const handleStatusChange = (selectedStatus: string) => {
    setStatusFilter(selectedStatus);
    onFilterChange('status', selectedStatus);
  };

  const handleRelevanceChange = (selectedRelevance: string) => {
    setRelevanceFilter(selectedRelevance);
    onFilterChange('relevance', selectedRelevance);
  };

  const handleClearAllFilters = () => {
    setStatusFilter('All');
    setRelevanceFilter('All');
    onFilterChange('status', 'All');
    onFilterChange('relevance', 'All');
  };

  return (
    <div className="flex items-center space-x-4">
      <div className='flex flex-col'>
        <Label htmlFor="status" className='mb-2'>Status</Label>
        <Dropdown onChange={handleStatusChange} options={['All', 'PENDING', 'PROGRESS', 'HOLD', 'CANCELLED', 'COMPLETED', 'INITIATED']} value={statusFilter} />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor="relevance" className='mb-2'>Relevance</Label>
        <Dropdown onChange={handleRelevanceChange} options={['All', 'critical', 'high', 'major', 'medium', 'low', 'minor', 'trivial']} value={relevanceFilter} />
      </div>
      <div className='flex flex-col'>
            <Label htmlFor="delete" className='mb-2'>Clear Filters</Label>
            <button className="p-2 bg-card border-2 rounded-md" onClick={handleClearAllFilters}>Clear All</button>
      </div>
    </div>
  );
};

export default DashboardFilter;
