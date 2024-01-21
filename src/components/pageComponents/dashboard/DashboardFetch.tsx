'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux'
import { setId } from '../../../redux/slices/idSlice'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Combobox from './Combobox';
import { Badge } from '@/components/ui/badge';


interface Report {
  _id: string;
  projectId: string;
  name: string;
  email: string;
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
  const [email, setEmail] = useState("")
  const [newEmail, setNewEmail] = useState('')

  const id = useSelector((state: any) => state.id.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data: Report[] = await response.json();
        const userReports = data.filter((report) => report.email === session?.user?.email);
        setReports(userReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchData();
  }, [session]);

  const markAsDone = async (reportId: string) => {
    try {
      const response = await fetch(`/api/tasks/${reportId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setReports(prevReports => prevReports.filter(report => report._id !== reportId));
      } else {
         console.error('Error deleting report:', response.statusText);
      }
    } catch (error) {
       console.error('Error marking report as done:', error);
    }
  };

  const reassignTask = async (reportId: string) => {
    try {
      const response = await fetch(`/api/tasks/update/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail }), // Sending newEmail in the request body
      });
  
      if (response.ok) {
        // Handle success, e.g., update state or perform additional actions
        const result = await response.json();
        console.log(result.message);
  
        // Remove the updated report from the local state
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === reportId
              ? { ...report, email: result.email } // assuming 'email' is the property you updated
              : report
          )
        );
      } else {
        console.error('Error re-assigning task:', response.statusText);
      }
    } catch (error) {
      console.error('Error re-assigning task:', error);
    }
  };
  const idModifier = (reportId: string) => {
    // Dispatch the action to update the id in Redux store
    dispatch(setId(reportId));
  };

  const capitalizeFirstLetter = (text:any) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const getTailwindClasses = (relevance: any) => {
    switch (relevance) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-red-500';
      case 'major':
        return 'bg-red-400';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-yellow-600';
      case 'minor':
        return 'bg-green-600';
      case 'trivial':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-blue-400';
      case 'PROGRESS':
        return 'bg-blue-600';
      case 'HOLD':
        return 'bg-violet-600';
      case 'CANCELLED':
        return 'bg-red-800';
      case 'COMPLETED':
        return 'bg-blue-700';
      case 'INITIATED':
        return 'bg-blue-500';
      default:
        return '';
    }
  };

  const updateStatusLocally = useCallback((selectedStatus:any, reportId:any) => {
    // Update the status locally without making an API call
    setReports((prevReports) =>
      prevReports.map((report) =>
        report._id === reportId ? { ...report, status: selectedStatus } : report
      )
    );
  }, [setReports]);

    useEffect(() => {
    console.log(id)
  }, [id])
  
  return (
    <div className='gap-0'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-full gap-0'>
        {reports.map(report => (
          <Card className="mx-10 my-10 overflow-hidden" key={report?._id}>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
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
                <Combobox reportId={report?._id} onUpdateStatusLocally={updateStatusLocally} />
            </CardFooter>
          </Card>
          
        ))}
      </ul>
    </div>
  );


};

export default DashboardFetch;
