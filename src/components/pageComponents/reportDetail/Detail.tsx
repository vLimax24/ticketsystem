"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DetailSidebar from "./DetailSidebar";
import { SidebarItem } from "./DetailSidebar";
import { useSession } from 'next-auth/react';
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Check,
  UserCircle,
  Trash2,
  Settings,
  LifeBuoy,
  MousePointer2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  capitalizeFirstLetter,
  getTailwindClasses,
} from "@/components/utils/utils";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

interface Report {
  _id: string;
  name: string;
  description: string;
  relevance: string;
  status: string;
  date: string;
  email: string;
}

const Detail: React.FC = () => {
  // const id = useSelector((state: any) => state.id.id);
  const { data: session } = useSession();
  const { _id: reportId } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [sharedEmail, setSharedEmail] = useState("");
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const markAsDone = async (reportId: string) => {
    try {
      const response = await fetch(`/api/tasks/${reportId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        history.back();
        // setReports(prevReports => prevReports.filter(report => report._id !== reportId));
      } else {
        console.error("Error deleting report:", response.statusText);
      }
    } catch (error) {
      console.error("Error marking report as done:", error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${reportId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        history.back();
        // setReports(prevReports => prevReports.filter(report => report._id !== reportId));
      } else {
        console.error("Error deleting report:", response.statusText);
      }
    } catch (error) {
      console.error("Error marking report as done:", error);
    }
  };



  const reassignTask = async () => {
    try {
      const response = await fetch(`/api/tasks/update/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }), // Sending newEmail in the request body
      });

      if (response.ok) {
        if (newEmail !== report?.email) history.back()
        // Handle success, e.g., update state or perform additional actions
        // const result = await response.json();
        // if (result.email != session?.user?.email)
        // // const updatedReport = {...report, email:result.email}
        // setReport(result);
      } else {
        console.error("Error re-assigning task:", response.statusText);
      }
    } catch (error) {
      console.error("Error re-assigning task:", error);
    }
  };

  const shareTask = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...report, email: sharedEmail }), // Sending newEmail in the request body
      });

      if (response.ok) {
        // setReport(result);
        const {msg} = await response.json()
        alert(msg)
      } else {
        console.error("Error re-assigning task:", response.statusText);
      }
    } catch (error) {
      console.error("Error re-assigning task:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchDynamic/${reportId}`);
        const fetchedData: Report = await response.json();
        // navigation.replace("/dashboard")
        fetchedData.date = new Date(fetchedData.date).toLocaleDateString(
          "de-DE"
        );
        setReport(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reportId]);

  return (
    <div className="flex w-full box-border mt-10 left-0">
      <DetailSidebar>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="block w-full">
              <SidebarItem
                icon={<Check size={20} />}
                text="Mark As Done"
              />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  // markAsDone(report?._id);
                }}
              >
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog>
          <DialogTrigger className="block w-full">
            <SidebarItem
              icon={<UserCircle size={20} />}
              text="Re-Assign Task"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Re-Assign Task</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  value={newEmail}
                  className="col-span-3"
                  placeholder="test@example.com"
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={reassignTask}>
                  OK
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="block w-full">
            <SidebarItem icon={<MousePointer2 size={20} />} text="Share Task" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share Task</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  value={sharedEmail}
                  className="col-span-3"
                  placeholder="test@example.com"
                  onChange={(e) => {setSharedEmail(e.target.value)}}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={shareTask}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="block w-full">
              <SidebarItem icon={<Trash2 size={20} />} text="Delete Task" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteTask();
                }}
              >
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Edit Task" />
        <Dialog>
          <DialogTrigger className="block w-full">
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Help</DialogTitle>
              <DialogDescription>
                Ticket System.
                <br />
                copyright@2024 all rights reserved
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DetailSidebar>
      {/* Main Content */}
      <div className="flex-1 ml-5 md:ml-20 mt-3.5">
        <h1 className="text-3xl md:text-[3rem] lg:text-[4rem] lg:mt-2 font-bold">{report?.name}</h1>
      </div>
    </div>
  );
};

export default Detail;
