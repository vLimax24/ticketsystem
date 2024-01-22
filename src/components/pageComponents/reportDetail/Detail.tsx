'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DetailSidebar from './DetailSidebar'
import { SidebarItem } from "./DetailSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";
import { Check, Delete, Redo, LayoutDashboard, BarChart3, UserCircle, Boxes, Package, Receipt, Settings, LifeBuoy } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface YourDataType {
  name: string;
  description: string;
  relevance: string,
  status: string,
  date: string,
  email: string,
  // Add more properties if needed
}



const Detail: React.FC = () => {
  const id = useSelector((state: any) => state.id.id);
  const [data, setData] = useState<YourDataType | null>(null);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

/*   const markAsDone = async (reportId: string) => {
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
  }; */


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchDynamic/${id}`);
        const fetchedData: YourDataType = await response.json();
        fetchedData.date = new Date(fetchedData.date).toLocaleDateString("de-DE");
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex min-h-screen w-full box-border">
      <DetailSidebar>
        <SidebarItem icon={<LayoutDashboard size={20}/>} text='Dashboard' active/>
        <SidebarItem icon={<BarChart3 size={20}/>} text='Statistics'/>
        <SidebarItem icon={<UserCircle size={20}/>} text='Users'/>
        <SidebarItem icon={<Boxes size={20}/>} text='Inventory'/>
        <SidebarItem icon={<Package size={20}/>} text='Order' alert/>
        <SidebarItem icon={<Receipt size={20}/>} text='Billings'/>
        <hr className="my-3"/>
        <SidebarItem icon={<Settings size={20}/>} text='Settings'/>
        <SidebarItem icon={<LifeBuoy size={20}/>} text='Help'/>
      </DetailSidebar>
      {/* Main Content */}
      <div className="w-3/4">
        <h1>{data?.name}</h1>
      </div>
      {/* Sidebar */}
    </div>
  );
};

export default Detail;
