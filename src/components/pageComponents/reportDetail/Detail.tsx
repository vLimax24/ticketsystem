'use client'
import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
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
  // Add more properties if needed
}

const Detail: React.FC = () => {
  const id = useSelector((state: any) => state.id.id);
  const [data, setData] = useState<YourDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchDynamic/${id}`);
        const fetchedData: YourDataType = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex min-h-screen w-full box-border">
      {/* Main Content */}
      <div className="p-4 w-3/4">
        <Card>
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
          </CardHeader>
          <CardContent>
            {data && (
              <>
                <CardDescription>{`Name: ${data.name}`}</CardDescription>
                <CardDescription>{`Description: ${data.description}`}</CardDescription>
              </>
            )}
            <p></p>
          </CardContent>
          <CardFooter>
            <Checkbox className="mr-2">Remember me</Checkbox>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
      {/* Sidebar */}
      <div className="p-4 flex-1 flex justify-center">
        <Label className="text-xl font-bold">Sidebar</Label>
        <Button className="mt-4">Button 1</Button>
        <Button className="mt-2">Button 2</Button>
        {/* Add more sidebar components as needed */}
      </div>
    </div>
  );
};

export default Detail;
