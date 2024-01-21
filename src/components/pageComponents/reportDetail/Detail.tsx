"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
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
import { buttonVariants } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Report {
  _id: string;
  projectId: string;
  name: string;
  email: string;
  statu: string;
  description: string;
  relevance: string;
  date: string;
  __v: number;
}

const Detail: React.FC = () => {
  const { data: session } = useSession();
  const [report, setReport] = useState<Report>();
  const params = useParams<{ tag: string; item: string }>();

  useEffect(() => {
    // const {_id} = router

    const fetchData = async () => {
      try {
        // const response = await fetch(`/api/tasks/${params._id}}`)
        const response = await fetch(`/api/tasks/65a980539606852c0e0ead91`)
        // const data: Report = {
        //   _id: "2342342",
        //   projectId: "123123",
        //   name: "ProguardSeoTest",
        //   email: "proguardseo@gmail.com",
        //   statu: "PENDING",
        //   description:
        //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui fuga vitae inventore asperiores reiciendis, nostrum impedit nesciunt veniam beatae, voluptatem amet modi ipsum nobis, maiores adipisci molestiae ex nemo debitis.",
        //   relevance: "Critical",
        //   date: "2024-03-01",
        //   __v: 1,
        // };

        const data: Report = await response.json()
        setReport(data);
      } catch (error) {
        console.log("Error fetching reports:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 p-4 border-solid border-2 border-r-2 border-light-green-500">
        <div className="flex flex-col">
          <div className="flex">
            <h2 className="text-2xl font-bold mr-5">{report?.name}</h2>
            <div className="float-right">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Label className="block text-base">Priority</Label>
            <Label className="text-base text-gray-100">{report?.relevance}</Label>
          </div>
          <div className="mt-4">
            <Label className="block text-base">Product Id</Label>
            <Label className="text-base text-gray-100">{report?.projectId}</Label>
          </div>
          <div className="mt-4">
            <Label className="block text-base">Relevance</Label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">{report?.statu}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>PENDING</DropdownMenuItem>
                <DropdownMenuItem>STARTED</DropdownMenuItem>
                <DropdownMenuItem>FINISHED</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-3 mt-4 gap-4">
            <div className="col-span-2">
              <Label className="block text-base">Description</Label>
              <div className="rounded-md border-2 mt-2">
                {report?.description}
              </div>
            </div>
            <div className="">
              <Label className="block text-base">Attached Files</Label>
              <div className="mt-2">
                <Button className="w-full">abc...</Button>
                <Button className="w-full mt-2">abc...</Button>
                <Button className="w-full mt-2">abc...</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="">
          <Button className="w-full">Mark As Done</Button>
          <Button className="w-full mt-3">Re-assign Task</Button>
          <Button className="w-full mt-3" variant="outline">
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
