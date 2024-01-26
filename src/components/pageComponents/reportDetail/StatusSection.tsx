import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge"
import { getTailwindClasses } from '@/components/utils/utils';
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AnyArray } from 'mongoose';

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

const StatusTypes:any = {
  PENDING: '20',
  PROGRESS: '50',
  HOLD: 'HOLD',
  CANCELLED: '69',
  COMPLETED: '100',
  INITIATED: '0',
};

const StatusSection: React.FC<StatusSectionProps> = ({ id }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [progress, setProgress] = useState<number>(10);

  const capitalizeFirstLetter = (text: any) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchDynamic/${id}`);
        const fetchedData: Report = await response.json();
        fetchedData.date = new Date(fetchedData.date).toLocaleDateString("de-DE");
        setReport(fetchedData);

        // Set progress based on status
        if (fetchedData.status === StatusTypes.HOLD) {
          // If status is on hold, use the last progress value
          setProgress((prevProgress) => prevProgress ?? 0);
        } else {
          // Set progress based on status type
          setProgress(parseInt(StatusTypes[fetchedData.status], 10));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit">Status</h1>
      </div>
      <div className="flex items-center justify-between mb-10 gap-5">
        <Badge className={`w-fit ${getTailwindClasses(report?.status)} text-white h-7`}>
          {report?.status ? capitalizeFirstLetter(report.status) : ''}
        </Badge>
        <Progress
          value={progress}
          className={`w-3/4 h-7`}
          status={report?.status}
        />
      </div>
    </>
  );
};

export default StatusSection;
