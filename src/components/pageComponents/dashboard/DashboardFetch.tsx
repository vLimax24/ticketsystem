import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const { data: session } = useSession()
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from your API endpoint
        const response = await fetch('/api/tasks') // Update the API endpoint
        const data: Report[] = await response.json()

        // Filter products based on the user's email
        const userReports = data.filter(report => report.email === session?.user?.email)
        setReports(userReports)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [session])

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
              <Button className='w-full'>Mark as done</Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  )
}

export default DashboardFetch
