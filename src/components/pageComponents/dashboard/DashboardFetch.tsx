'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { setId } from '../../../redux/slices/idSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DashboardFilter from './DashboardFilter';
import Link from 'next/link';
import Combobox from './Combobox';
import { Badge } from '@/components/ui/badge';
import { getTailwindClasses } from '@/components/utils/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Report {
  _id: string;
  projectId: string;
  name: string;
  email: string;
  senderEmail: string;
  description: string;
  relevance: string;
  status: string;
  date: string;
  __v: number;
}

const DashboardFetch: React.FC = () => {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    status: 'All',
    relevance: 'All',
  });
  const [activeTab, setActiveTab] = useState('inbox'); // State to manage active tab

  const id = useSelector((state: any) => state.id.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === 'inbox') {
      fetchData();
    } else if (activeTab === 'outbox') {
      fetchOutboxReports();
    }
  }, [activeTab, filterOptions]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data: Report[] = await response.json();
      let filteredReports = data.filter((report) => report.email === session?.user?.email);

      if (filterOptions.status !== 'All') {
        filteredReports = filteredReports.filter((report) => report.status === filterOptions.status);
      }

      if (filterOptions.relevance !== 'All') {
        filteredReports = filteredReports.filter((report) => report.relevance === filterOptions.relevance);
      }

      setReports(filteredReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchOutboxReports = async () => {
    try {
      const response = await fetch('/api/outbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail: session?.user?.email }),
      });
      const data: Report[] = await response.json();
      let filteredReports = data;

      if (filterOptions.status !== 'All') {
        filteredReports = filteredReports.filter((report) => report.status === filterOptions.status);
      }

      if (filterOptions.relevance !== 'All') {
        filteredReports = filteredReports.filter((report) => report.relevance === filterOptions.relevance);
      }

      setReports(filteredReports);
    } catch (error) {
      console.error('Error fetching outbox reports:', error);
    }
  };

  const idModifier = (reportId: string) => {
    dispatch(setId(reportId));
  };

  const capitalizeFirstLetter = (text: any) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const updateStatusLocally = useCallback((selectedStatus: any, reportId: any) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report._id === reportId ? { ...report, status: selectedStatus } : report
      )
    );
  }, [setReports]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filterType]: value,
    }));
  };
  
  return (
    <div className='gap-0 mt-10'>
      <div className='flex items-start lg:items-center justify-between px-10 flex-col lg:flex-row'>
        <div className='flex items-start lg:items-center flex-col lg:flex-row'>
        <div className='flex flex-col justify-center'>
        <div className='text-[42px]'>Welcome back, <strong>{session?.user?.name}</strong></div>
        <CardDescription className='text-lg'>Here you can view the reports you {activeTab === 'inbox' ? 'received' : 'sent'}</CardDescription>
        </div>
        <Tabs defaultValue="inbox" className="lg:w-[400px] lg:ml-10 my-10 lg:my-2 w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox" onClick={() => setActiveTab('inbox')}>Inbox</TabsTrigger>
            <TabsTrigger value="outbox" onClick={() => setActiveTab('outbox')}>Outbox</TabsTrigger>
          </TabsList>
        </Tabs>
        
        </div>
        <DashboardFilter onFilterChange={handleFilterChange} />
      </div>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-full gap-0'>
        {reports.map(report => (
          <Card className="mx-10 my-10 overflow-hidden" key={report?._id}>
            <CardHeader>
              <CardTitle className='whitespace-nowrap text-ellipsis overflow-hidden'>{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
              <div>
                <Label htmlFor="name">Relevance</Label>
                <CardDescription>
                  <Badge className={`mt-2 ${getTailwindClasses(report?.relevance)} hover:cursor-pointer text-white`}>
                    {report?.relevance ? capitalizeFirstLetter(report.relevance) : ''}
                  </Badge>
                </CardDescription>
              </div>
                <div>
                  <Label htmlFor="name">Status</Label>
                  <CardDescription>
                  <Badge className={`mt-2 ${getTailwindClasses(report?.status)} hover:cursor-pointer text-white`}>
                    {report?.status ? capitalizeFirstLetter(report.status) : ''}
                  </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between w-full items-center">
              <Link href={`/dashboard/${report?._id}`} className='w-full mr-5'>
                <Button className='w-full' onClick={() => idModifier(report?._id)}>See More</Button>
              </Link>
              {activeTab === 'inbox' && <Combobox reportId={report?._id} onUpdateStatusLocally={updateStatusLocally} />}
            </CardFooter>
          </Card>
          
        ))}
      </ul>
    </div>
  );


};

export default DashboardFetch;
