import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { getTailwindClasses } from '@/components/utils/utils';
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"




interface StatusSectionProps {
  id: string;
}


interface Report {
  _id: string;
  name: string;
  description: string;
  relevance: string;
  status: string;
  date: string;
  email: string;
}
const StatusSection: React.FC<StatusSectionProps> = ({ id }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [progress, setProgress] = React.useState(10)

  const capitalizeFirstLetter = (text:any) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchDynamic/${id}`);
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
  }, [id]);


  return (
    <>
    <div className='flex items-center justify-between mb-10'>
      <Badge className={`w-fit ${getTailwindClasses(report?.status)} text-white`}>
      {report?.status ? capitalizeFirstLetter(report.status) : ''}
      </Badge>
      <Progress value={progress} className="w-full" />
    </div>
    </>
  )
};

export default StatusSection;
