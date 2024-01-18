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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

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
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);
  const [email, setEmail] = useState("")
  const [id, setId] = useState('')
  const [newEmail, setNewEmail] = useState('')
 


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
         console.error('Error deleting report:', response.statusText);
      }
    } catch (error) {
       console.error('Error marking report as done:', error);
    }
  };

  const toggleDescription = (reportId: string) => {
    setExpandedDescription((prevDescription) => (
      prevDescription === reportId ? null : reportId
    ));
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
  const idModifyer = (reportId: string) => {
    setId(reportId)
  }

  return (
    <div >
      <Drawer>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {reports.map(report => (
          <Card className="sm:w-[300px] md:w-[400px] lg:w-[450px] mx-10 my-10 overflow-hidden" key={report?._id}>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
              <div>
                  <Label htmlFor="status">Status</Label>
                  <CardDescription>{report?.status}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Description</Label>
                  <CardDescription className={expandedDescription === report._id ? '' : 'line-clamp-1 cursor-pointer'} onClick={() => toggleDescription(report._id)}>{report?.description}</CardDescription>
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
            <CardFooter className="flex justify-between w-full flex-col">
              
                <Button className='w-full' onClick={() => markAsDone(report._id)}>
                  Mark as done
                </Button>
                <DrawerTrigger asChild>
                  <Button className='w-full mt-3' variant={'outline'} onClick={() => idModifyer(report?._id)}>Re-assign Task</Button>
                </DrawerTrigger>
            </CardFooter>
            <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Re-assign</DrawerTitle>
            <DrawerDescription>Enter the new Email to re-asign the task</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col space-y-1.5 my-5">
              <Label htmlFor="email">Email of the Recipiant</Label>
              <Input id="name" placeholder="Enter the Email of your recipiant" onChange={(e) => setNewEmail(e.target.value)} value={newEmail}/>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
            <Button onClick={() => reassignTask(report?._id)}>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
          </Card>
          
        ))}
      </ul>



    </Drawer>
    </div>
  );
};

export default DashboardFetch;
