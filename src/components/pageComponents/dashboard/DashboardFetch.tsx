import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ObjectId } from 'mongoose'

interface Report {
  _id: string;
  projectId: string;
  name: string;
  email: string;
  description: string;
  relevance: string;
  date: string;
  __v: number;
}

const DashboardFetch: React.FC = () => {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data: Report[] = await response.json();
        const userReports = data.filter(report => report.email === session?.user?.email);
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
        // console.error('Error deleting report:', response.statusText);
      }
    } catch (error) {
      // console.error('Error marking report as done:', error);
    }
  };

  return (
    <div>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {reports.map(report => (
          <Card className="w-[400px] mx-10 my-10" key={report?._id}>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Description</Label>
                  <CardDescription>{report?.description}</CardDescription>
                </div>
                <div>
                  <Label htmlFor="name">Relevance</Label>
                  <CardDescription>{report?.relevance}</CardDescription>
                </div>
                <div>
                  <Label htmlFor="name">Project ID</Label>
                  <CardDescription>{report?.projectId}</CardDescription>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between w-full">
              <Button className='w-full' onClick={() => markAsDone(report._id)}>
                Mark as done
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default DashboardFetch;
