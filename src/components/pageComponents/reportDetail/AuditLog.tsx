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
  const [auditLog, setAuditLog] = useState([
    { id: 1, action: 'Created report', timestamp: '2024-01-26 10:30 AM' },
    { id: 2, action: 'Updated data', timestamp: '2024-01-26 11:15 AM' },
    { id: 3, action: 'Updated data', timestamp: '2024-01-26 11:15 AM' },
    { id: 4, action: 'Updated data', timestamp: '2024-01-26 11:15 AM' },
    { id: 5, action: 'Updated data', timestamp: '2024-01-26 11:15 AM' },
    // Add more entries as needed
  ]);

  return (
    <div className="py-4 rounded shadow mt-5 max-h-[16rem] overflow-y-auto">
      <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-5 flex flex-col">Audit Log</h1>
      {/* <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditLog.map((logEntry) => (
          <TableRow key={logEntry.id}>
            <TableCell>{logEntry.action}</TableCell>
            <TableCell>{logEntry.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> */}
    <AuditLogDownload reportId={reportId}/>
    </div>
  );
};

export default AuditLog;
