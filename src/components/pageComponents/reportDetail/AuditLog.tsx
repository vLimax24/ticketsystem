// components/AuditLog.js
import React, { useState } from 'react';
import AuditLogDownload from './AuditLogDownload'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const AuditLog = ({ reportId }:any) => {
  return (
    <div className="py-4 rounded mt-5 max-h-[16rem] overflow-y-auto">
      <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-7 flex flex-col">Audit Log</h1>
      <AuditLogDownload reportId={reportId}/>
    </div>
  );
};

export default AuditLog;
